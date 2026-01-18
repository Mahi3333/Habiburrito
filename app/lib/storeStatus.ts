import { prisma } from '@/lib/prisma';

type StatusResult = {
  isOpen: boolean;
  isOrderingAllowed: boolean;
  dayName: string;
  openTimeLabel: string;
  closeTimeLabel: string;
  message: string;
};

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const format12h = (time24: string) => {
  const [h, m] = time24.split(':').map(Number);
  const hours = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hours}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const safeDefaultHours: Record<string, { open: string; close: string; closed?: boolean }> = {
  Sunday: { open: '11:00', close: '23:00' },
  Monday: { open: '11:00', close: '23:00' },
  Tuesday: { open: '11:00', close: '23:00' },
  Wednesday: { open: '11:00', close: '23:00' },
  Thursday: { open: '11:00', close: '23:00' },
  Friday: { open: '11:00', close: '24:00' },
  Saturday: { open: '11:00', close: '24:00' },
};

export async function getStoreStatus(): Promise<StatusResult> {
  let onlineAllowed = true;
  let overrideMessage: string | null = null;
  let hoursByDay = safeDefaultHours;

  try {
    const [settings, storeHours] = await Promise.all([
      prisma.appSetting.findFirst(),
      prisma.storeHour.findMany(),
    ]);

    if (settings) {
      onlineAllowed = settings.online_ordering_enabled;
      overrideMessage = settings.override_message;
    }

    if (storeHours && storeHours.length) {
      hoursByDay = storeHours.reduce<Record<string, { open: string; close: string; closed?: boolean }>>((acc, h) => {
        acc[h.day] = { open: h.open_time, close: h.close_time, closed: h.closed };
        return acc;
      }, {});
    }
  } catch (e) {
    // fallback to defaults silently
  }

  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const current = hoursByDay[dayName] || safeDefaultHours[dayName] || { open: '11:00', close: '23:00' };

  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin = toMinutes(current.open);
  const closeMin = toMinutes(current.close);
  const scheduleClosed = current.closed === true;
  const withinHours = !scheduleClosed && nowMin >= openMin && nowMin < closeMin;
  const isOpen = withinHours;
  const isOrderingAllowed = onlineAllowed && isOpen;

  let message = '';
  if (!onlineAllowed && overrideMessage) {
    message = overrideMessage;
  } else if (!onlineAllowed) {
    message = 'Online orders are paused. Please call the store.';
  } else if (!isOpen) {
    message = `We reopen ${dayName} ${format12h(current.open)} – ${format12h(current.close)}.`;
  } else {
    message = `${dayName}: ${format12h(current.open)} – ${format12h(current.close)}.`;
  }

  return {
    isOpen,
    isOrderingAllowed,
    dayName,
    openTimeLabel: format12h(current.open),
    closeTimeLabel: format12h(current.close),
    message,
  };
}
