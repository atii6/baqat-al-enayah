import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import GridItem, { GridItemProps } from "@/components/grid/GridItem";
import ErrorText from "./ErrorText";
import { cn } from "@/lib/utils";

type CardOption = {
  value: string;
  label: string;
  icon?: React.ElementType;
};

type FormCardSelectProps = {
  name: string;
  label?: string;
  options: CardOption[];
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
  labelStyles?: string;
  columns?: number;
};

const FormCardSelect: React.FC<FormCardSelectProps> = ({
  name,
  label,
  options,
  size = 12,
  disableGutter = false,
  className,
  labelStyles,
  columns = 2,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <GridItem size={size} className={className}>
      {label && (
        <Label className={cn("text-base font-medium", labelStyles)}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div
              className={cn(
                "grid gap-4 mt-2",
                columns === 2 && "grid-cols-2",
                columns === 3 && "grid-cols-3",
                columns === 4 && "grid-cols-4"
              )}
            >
              {options.map((option) => {
                const isActive = field.value === option.value;
                const Icon = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => field.onChange(option.value)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                      isActive
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    )}

                    <span
                      className={cn(
                        "font-medium",
                        isActive ? "text-primary" : "text-foreground"
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {!disableGutter && (
              <div className="h-2 mt-1">
                <ErrorText message={fieldState.error?.message || ""} />
              </div>
            )}
          </>
        )}
      />
    </GridItem>
  );
};

export default FormCardSelect;
