import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import GridItem, { GridItemProps } from "@/components/grid/GridItem";
import ErrorText from "./ErrorText";
import { cn } from "@/lib/utils";

type FormSwitchButtonProps = {
  name: string;
  label: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
  labelStyles?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormSwitchButton: React.FC<FormSwitchButtonProps> = ({
  name,
  label,
  size = 12,
  disableGutter = false,
  className,
  labelStyles,
  required,
  disabled,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <GridItem size={size} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="flex items-center justify-between">
              <Label
                htmlFor={name}
                className={cn(
                  "text-sm font-medium cursor-pointer",
                  labelStyles
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </Label>

              <Switch
                id={name}
                checked={!!field.value}
                onCheckedChange={field.onChange}
                disabled={disabled || isSubmitting}
              />
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

export default FormSwitchButton;
