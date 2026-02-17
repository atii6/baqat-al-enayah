import React from "react";
import FormResetButton from "./Fields/FormResetButton";
import FormButton from "./Fields/FormButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { GridItem } from "../grid";
import type { GridItemProps } from "../grid/GridItem";

type FormFooterProps = {
  IsResetButtonRequired?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
  size?: GridItemProps["size"];
  isSubmitButtonDisabled?: boolean;
  onBackButtonClick?: () => void;
  renderBackButton?: boolean;
  disableBackButton?: boolean;
  backButtonType?: "button" | "submit";
  backButtonText?: string;
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "ghost"
    | "secondary"
    | "link"
    | "outline";
  onNextClick?: () => void;
  disableNextButton?: boolean;
};

function FormFooter({
  IsResetButtonRequired = false,
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  size = 12,
  isSubmitButtonDisabled = false,
  submitButtonVariant = "default",
  onBackButtonClick,
  renderBackButton = false,
  backButtonType = "button",
  backButtonText = "Back",
  disableBackButton = false,
  onNextClick,
  disableNextButton = false,
}: FormFooterProps) {
  const { formState } = useFormContext();
  const isSubmissionDisabled =
    formState.isSubmitting || !formState.isValid || isSubmitButtonDisabled;

  const isBackDisabled =
    backButtonType === "submit"
      ? disableBackButton || isSubmissionDisabled
      : disableBackButton;
  return (
    <GridItem size={size}>
      <div className="flex items-center justify-between w-full gap-6 md:gap-12">
        {(IsResetButtonRequired || renderBackButton) && (
          <div className="border-t border-[#9EB7D1] pt-4">
            {IsResetButtonRequired && (
              <FormResetButton>
                <ArrowLeft className="mr-2" size={20} />
                {resetButtonText}
              </FormResetButton>
            )}
            {renderBackButton && (
              <Button
                variant={"default"}
                type={backButtonType}
                onClick={onBackButtonClick}
                disabled={isBackDisabled}
              >
                <ArrowLeft className="mr-2" size={20} />
                {backButtonText}
              </Button>
            )}
          </div>
        )}
        <div className="flex items-center justify-between w-full border-t border-[#9EB7D1] pt-4">
          <FormButton
            variant={submitButtonVariant}
            disabled={isSubmissionDisabled}
          >
            {submitButtonText}
          </FormButton>
          <Button
            type="button"
            onClick={onNextClick}
            disabled={disableNextButton}
          >
            Next
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </GridItem>
  );
}

export default FormFooter;
