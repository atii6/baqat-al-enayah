import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  DefaultValues,
  FieldValues,
  Resolver,
  SubmitHandler,
} from "react-hook-form";
import type { ZodSchema, ZodType } from "zod";
import { cn } from "@/lib/utils";
import { Grid } from "../grid";
import { GridItemProps } from "../grid/GridItem";

type Props<Value extends FieldValues> = {
  onSubmit: SubmitHandler<Value>;
  children: React.ReactNode;
  validationSchema: ZodSchema<Value>;
  initialValues: DefaultValues<Value>;
  className?: string;
  containerStyles?: GridItemProps["className"];
  isLoading?: boolean;
  resetAfterSubmit?: boolean;
};

export default function Form<Values extends FieldValues>({
  onSubmit,
  validationSchema,
  children,
  initialValues,
  className = "",
  containerStyles = "",
  isLoading = false,
  resetAfterSubmit = false,
}: Props<Values>) {
  const [isInitialValuesSetByResponse, setIsInitialValuesSetByResponse] =
    React.useState(false);
  const methods = useForm<Values>({
    defaultValues: initialValues,
    resolver: zodResolver(
      validationSchema as ZodType<Values, FieldValues>
    ) as Resolver<Values>,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (!isInitialValuesSetByResponse && !isLoading) {
      methods.reset(initialValues);
      setIsInitialValuesSetByResponse(true);
    }
    // eslint-disable-next-line
  }, [initialValues]);

  const _handleSubmit = async (val: Values) => {
    try {
      const result = await onSubmit(val);

      if (resetAfterSubmit && result === true) {
        methods.reset(initialValues);
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <FormProvider
      {...methods}
      reset={() => {
        console.info("Reset");
      }}
    >
      <form
        onSubmit={methods.handleSubmit(_handleSubmit, (oninvalid) => {
          console.info("schema failed", oninvalid);
        })}
        onReset={() => methods.reset(initialValues)}
        className={cn("", className)}
      >
        <Grid className={cn("", containerStyles)}>{children}</Grid>
      </form>
    </FormProvider>
  );
}
