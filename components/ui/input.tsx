import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: { icon: React.ElementType; onClick?: () => void; size?: number };
  endIcon?: { icon: React.ElementType; onClick?: () => void; size?: number };
  renderFieldButton?: boolean;
  onFieldButtonClick?: () => void;
  fieldButtonText?: string;
  fieldButtonStyles?: string;
  disableFieldButton?: boolean;
};

function Input({
  className,
  type,
  renderFieldButton,
  onFieldButtonClick,
  fieldButtonText,
  fieldButtonStyles,
  disableFieldButton,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground h-12 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      {renderFieldButton && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-50">
          <Button
            type="button"
            onClick={onFieldButtonClick}
            disabled={disableFieldButton}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50",
              fieldButtonStyles
            )}
          >
            {fieldButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}

export { Input };
