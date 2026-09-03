import React, { createContext, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OTPContextValue {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const OTPContext = createContext<OTPContextValue | null>(null);

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ maxLength, value, onChange, className, children, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '').slice(0, maxLength);
      onChange(val);
    };

    return (
      <OTPContext.Provider value={{ value, maxLength, onChange, inputRef }}>
        <div
          ref={ref}
          onClick={handleClick}
          className={cn('relative flex items-center cursor-pointer select-none', className)}
          {...props}
        >
          {/* Hidden input for keyboard & mobile support */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={maxLength}
            value={value}
            onChange={handleInputChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20 focus:outline-none"
            autoComplete="one-time-code"
          />
          {children}
        </div>
      </OTPContext.Provider>
    );
  }
);
InputOTP.displayName = 'InputOTP';

export const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-1.5', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const context = useContext(OTPContext);
    if (!context) {
      throw new Error('InputOTPSlot must be used within an InputOTP');
    }

    const { value, inputRef } = context;
    const char = value[index] || '';
    const isFocused =
      (value.length === index || (index === context.maxLength - 1 && value.length === context.maxLength)) &&
      document.activeElement === inputRef.current;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-9 w-8 sm:h-10 sm:w-9 items-center justify-center rounded-xl border text-xs sm:text-sm font-bold shadow-2xs transition-all bg-white font-mono',
          char
            ? 'border-[#0B57D0] text-[#0B1E48] bg-blue-50/40 ring-1 ring-[#0B57D0]/30'
            : 'border-slate-300 text-slate-400',
          isFocused && 'ring-2 ring-[#0B57D0] border-[#0B57D0] bg-white',
          className
        )}
        {...props}
      >
        {char}
        {!char && isFocused && (
          <span className="absolute inset-0 flex items-center justify-center animate-pulse text-[#0B57D0] font-normal">
            |
          </span>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

export const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} role="separator" className={cn('flex items-center text-slate-400 font-bold px-1 select-none', className)} {...props}>
    <span className="h-0.5 w-2 sm:w-2.5 bg-slate-300 rounded-full" />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';
