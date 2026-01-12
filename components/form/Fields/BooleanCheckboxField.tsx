import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorText from "./ErrorText";
import type { GridItemProps } from "@/components/grid/GridItem";
import GridItem from "@/components/grid/GridItem";

type BooleanCheckboxFieldProps = {
  name: string;
  label: string | React.ReactNode;
  size?: GridItemProps["size"];
  required?: boolean;
};

const BooleanCheckboxField: React.FC<BooleanCheckboxFieldProps> = ({
  name,
  label,
  size = 12,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <GridItem className="" size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const checkboxId = `checkbox-${name}`;
          return (
            <div>
              <div className="flex items-start gap-2 ">
                <Checkbox
                  {...field}
                  id={checkboxId}
                  checked={!!field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="focus:border-blue-500 transition-colors duration-200"
                />
                {label && (
                  <label
                    htmlFor={checkboxId}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {label}
                    {required && <span className="text-red-500 ml-0.1">*</span>}
                  </label>
                )}
              </div>
              <ErrorText message={fieldState.error?.message || ""} />
            </div>
          );
        }}
      />
    </GridItem>
  );
};

export default BooleanCheckboxField;
