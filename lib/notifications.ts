import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio Client
// We wrap this in a check so it doesn't crash if keys are missing during build/dev
const client = (accountSid && authToken) ? twilio(accountSid, authToken) : null;

interface OrderDetails {
    id: number;
    customerName: string;
    items: any[];
    total: number;
}

interface OrderDetails {
    id: number;
    customerName: string;
    items: any[];
    total: number;
}

export async function sendOrderConfirmationSMS(phone: string, order: OrderDetails) {
    if (!client || !twilioPhoneNumber) {
        console.warn("Twilio credentials missing. SMS not sent.");
        return false;
    }

    const estimatedTime = "20-30 minutes";
    const itemsList = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');

    const message = `
🔥 HabiBurrito Order #${order.id} Confirmed!
Hi ${order.customerName}, thanks for your order.

We're firing up the grill! 
Your order: ${itemsList}
Total: $${order.total.toFixed(2)}

Estimated Prep Time: ${estimatedTime}

See you soon!
    `.trim();

    try {
        await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: phone
        });
        console.log(`SMS sent to ${phone}`);
        return true;
    } catch (error) {
        console.error("Failed to send SMS:", error);
        return false;
    }
}
