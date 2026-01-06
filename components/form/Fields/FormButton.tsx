import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { GridItemProps } from "@/components/grid/GridItem";
import GridItem from "@/components/grid/GridItem";
import { cn } from "@/lib/utils";

type FormButtonProps = ButtonProps &
  GridItemProps & { containerStyles?: string };

const FormButton = ({ ...props }: FormButtonProps) => {
  const { formState } = useFormContext();
  const { children, className, disabled, variant, containerStyles, ...rest } =
    props;
  const isDisabled = formState.isSubmitting || !formState.isValid || disabled;

  return (
    <GridItem className={cn("", containerStyles)}>
      <Button
        {...rest}
        disabled={isDisabled}
        type="submit"
        size="lg"
        className={className}
        variant={variant}
      >
        {formState.isSubmitting ? <Spinner /> : children}
      </Button>
    </GridItem>
  );
};

export default FormButton;
