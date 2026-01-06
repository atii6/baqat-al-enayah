import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";
import ErrorText from "./ErrorText";
import { Label } from "@/components/ui/label";
import GridItem, { GridItemProps } from "@/components/grid/GridItem";
import { cn } from "@/lib/utils";

type FormTextFieldProps = {
  name: string;
  label: string;
  type?: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
  inputFieldStyles?: string;
  labelStyles?: string;
  onFileChange?: (file: File) => void;
} & Omit<InputProps, "name" | "type" | "label">;

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  required,
  size = 12,
  readOnly = false,
  disableGutter = false,
  className,
  labelStyles,
  ...rest
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <GridItem className={className} size={size}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "text-sm font-medium text-(--text-primary) mb-1",
            labelStyles
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              {...rest}
              readOnly={readOnly || isSubmitting}
              id={name}
              type={type}
            />

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

export default FormTextField;
