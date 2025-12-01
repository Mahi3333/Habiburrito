import React from 'react';

interface ModifierCardProps {
    name: string;
    price: number;
    selected?: boolean;
    onSelect?: () => void;
}

const ModifierCard: React.FC<ModifierCardProps> = ({ name, price, selected = false, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className={`
        cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center
        ${selected
                    ? 'border-brand-orange bg-orange-50'
                    : 'border-gray-200 hover:border-brand-orange/50 bg-white'
                }
      `}
        >
            <div className="flex items-center gap-3">
                <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selected ? 'border-brand-orange' : 'border-gray-300'}
        `}>
                    {selected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                    )}
                </div>
                <span className={`font-medium ${selected ? 'text-brand-orange' : 'text-gray-700'}`}>
                    {name}
                </span>
            </div>
            <span className="font-semibold text-gray-900">
                +${price.toFixed(2)}
            </span>
        </div>
    );
};

export default ModifierCard;
