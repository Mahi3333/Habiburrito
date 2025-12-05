import React from 'react';

interface ModifierCardProps {
    name: string;
    price: number;
    selected?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
}

const ModifierCard: React.FC<ModifierCardProps> = ({ name, price, selected = false, disabled = false, onSelect }) => {
    return (
        <div
            onClick={disabled ? undefined : onSelect}
            className={`p-4 rounded-2xl border transition-all duration-200 flex justify-between items-center backdrop-blur-lg
            ${disabled
                    ? 'opacity-40 cursor-not-allowed border-white/5 bg-white/5'
                    : 'cursor-pointer ' + (selected
                        ? 'border-brand-gold/60 bg-white/10 shadow-[0_15px_40px_rgba(212,175,55,0.18)]'
                        : 'border-white/10 bg-white/5 hover:border-brand-gold/40 hover:bg-white/10')
                }
      `}
        >
            <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${disabled ? 'border-white/10' : (selected ? 'border-brand-gold bg-brand-gold/20' : 'border-white/30')
                    }`}>
                    {selected && !disabled && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-jade" />
                    )}
                </div>
                <span className={`font-medium ${disabled ? 'text-gray-500' : (selected ? 'text-brand-gold' : 'text-brand-cream')}`}>
                    {name}
                </span>
            </div>
            <span className={`font-semibold ${disabled ? 'text-gray-600' : (selected ? 'text-brand-gold' : 'text-gray-200')}`}>
                {price > 0 ? `+${price.toFixed(2)}` : 'Included'}
            </span>
        </div>
    );
};

export default ModifierCard;
