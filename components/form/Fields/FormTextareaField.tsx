import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GridItem } from "@/components/grid";
import type { GridItemProps } from "@/components/grid/GridItem";

export type FormTextareaFieldProps = {
  name: string;
  label: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "type" | "label"
>;

const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  name,
  label,
  required,
  size = 12,
  rows = 8,
  disableGutter = false,
  className,
  readOnly = false,
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
          className="text-sm font-medium text-(--text-primary) mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <>
              <Textarea
                {...field}
                {...rest}
                readOnly={isSubmitting || readOnly}
                id={name}
                rows={rows}
              />
              {!disableGutter && (
                <div className="h-2">
                  <ErrorText message={fieldState.error?.message || ""} />
                </div>
              )}
            </>
          );
        }}
      />
    </GridItem>
  );
};

export default FormTextareaField;
