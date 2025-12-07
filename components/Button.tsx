import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, className = '', disabled }) => {
    const baseStyles = 'px-6 py-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-brand-orange text-white hover:bg-orange-600',
        secondary: 'bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
