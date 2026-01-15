import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { GridItem } from "@/components/grid";
import FormButton from "@/components/form/Fields/FormButton";

type Props = {
  currentStep?: number;
  handleNext: () => void;
  handleBack: () => void;
};

function RegistryFormFooter({ currentStep, handleNext, handleBack }: Props) {
  const {
    trigger,
    formState: { isValid },
  } = useFormContext();

  return (
    <GridItem className="flex justify-between pt-6">
      {currentStep && currentStep > 1 ? (
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      ) : (
        <div />
      )}

      {currentStep && currentStep < 3 && (
        <Button
          type="button"
          onClick={async () => {
            if (isValid) {
              handleNext();
            } else {
              trigger();
            }
          }}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      {currentStep === 3 && <FormButton>Create Registry</FormButton>}
    </GridItem>
  );
}

export default RegistryFormFooter;
