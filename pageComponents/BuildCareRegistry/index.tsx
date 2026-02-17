import React from "react";
import { useUserStore } from "@/store";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";
import PriorityItems from "./PriorityItems";
import GiftsAndMonetary from "./GiftsAndMonetary";
import FormStepper, { StepContent } from "@/components/form/StepperForms";
import Product from "./Product";
import PatientStoryForm from "./PatientStoryForm";

export type StepperFormType = {
  stepID: number;
  stepTitle: string;
  stepContent: React.ReactNode;
  NextStepID: number;
  PrevStepID: number;
};

function BuildCareRegistry() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const [currentStep, setCurrentStep] = React.useState(1);
  const { data: registryItems, isLoading } = useGetRegistryItemByRegistryID(
    user.giftWellID!,
  );

  const buildingRegistrySteps = [
    {
      stepID: 1,
      stepTitle: "Story",
      stepContent: (props: StepContent) => <PatientStoryForm {...props} />,
      NextStepID: 2,
      PrevStepID: 0,
    },
    {
      stepID: 2,
      stepTitle: "Product",
      stepContent: (props: StepContent) => (
        <Product registryItems={registryItems || []} {...props} />
      ),
      NextStepID: 3,
      PrevStepID: 1,
    },

    {
      stepID: 3,
      stepTitle: "Prioritize Items",
      stepContent: (props: StepContent) => (
        <PriorityItems
          registryItems={registryItems || []}
          isLoading={isLoading}
          {...props}
        />
      ),
      NextStepID: 4,
      PrevStepID: 2,
    },
    {
      stepID: 4,
      stepTitle: "Services and Support",
      stepContent: (props: StepContent) => <GiftsAndMonetary {...props} />,
      NextStepID: 5,
      PrevStepID: 3,
    },
  ];

  return (
    <div className="bg-white md:mx-6 mx-2 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] overflow-hidden relative">
      <FormStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={buildingRegistrySteps}
      />
    </div>
  );
}

export default BuildCareRegistry;
