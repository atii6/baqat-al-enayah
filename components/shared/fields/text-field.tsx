import React from "react";
import { Input, type InputProps } from "@/components/ui/input";
import ErrorText from "../../form/Fields/ErrorText";
import { Label } from "../../ui/label";
import GridItem, { type GridItemProps } from "@/components/grid/GridItem";

type TextFieldProps = {
  name: string;
  label: string;
  error?: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
} & Omit<InputProps, "name" | "type" | "label">;

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  error,
  size = 6,
  required,
  disableGutter = false,
  ...rest
}) => {
  const { className, ...restProps } = rest;
  return (
    <GridItem className={className} size={size}>
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <div className="flex flex-col gap-1">
        <Input id={name} name={name} required={required} {...restProps} />
        {!disableGutter && (
          <div className="h-2">
            <ErrorText message={error} />
          </div>
        )}
      </div>
    </GridItem>
  );
};

export default TextField;
