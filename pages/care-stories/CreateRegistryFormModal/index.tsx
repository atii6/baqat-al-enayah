import React from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "@/components/form/Form";
import CredentialInformationFormFields from "./CredentialInformationFormFields";
import RegistryTypeFormFields from "./RegistryTypeFormFields";
import ReviewFormDetails from "./ReviewFormDetails";
import RegistryFormFooter from "./RegistryFormFooter";
import { useCreateCareRegistryModal } from "@/context/CreateRegistryModalContext";

const validationSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),

    registryFor: z.enum(["myself", "someoneElse"]),
    recipientName: z.string().optional(),
    recipientEmail: z.string().optional(),

    isPublic: z.boolean(),
    limitAccessToLinkHolders: z.boolean(),
    allowOthersToAddGifts: z.boolean(),
    emailAlertsForContributions: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.registryFor === "someoneElse") {
      if (!data.recipientName || data.recipientName.length < 2) {
        ctx.addIssue({
          path: ["recipientName"],
          message: "Recipient name is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (
        !data.recipientEmail ||
        !z.string().email().safeParse(data.recipientEmail).success
      ) {
        ctx.addIssue({
          path: ["recipientEmail"],
          message: "Valid recipient email is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type FormData = z.infer<typeof validationSchema>;

const initialValues: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  registryFor: "myself",
  recipientName: "",
  recipientEmail: "",
  isPublic: false,
  limitAccessToLinkHolders: true,
  allowOthersToAddGifts: true,
  emailAlertsForContributions: true,
};

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
}

const CreateRegistryFormModal: React.FC<Props> = ({ open, onClose }) => {
  const { initialValues: heroFormValues } = useCreateCareRegistryModal();
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps = [
    { number: 1, title: "Account" },
    { number: 2, title: "Registry Type" },
    { number: 3, title: "Confirm" },
  ];

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleNext = () => {
    setCurrentStep((s) => Math.min(3, s + 1));
  };

  const handleSubmit = (data: FormData) => {
    console.log("handleSubmit:", data);
    onClose(false);
    setCurrentStep(1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-140 max-h-[85vh] overflow-auto p-0 bg-card scrollbar-hide"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-semibold">
              Create Your Registry
            </DialogTitle>
          </DialogHeader>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="mt-2 text-xs">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="dotted-line hidden sm:block self-start mt-5" />
                )}
              </React.Fragment>
            ))}
          </div>

          <Form
            initialValues={{ ...initialValues, ...heroFormValues }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <>
              {currentStep === 1 && <CredentialInformationFormFields />}
              {currentStep === 2 && <RegistryTypeFormFields />}
              {currentStep === 3 && <ReviewFormDetails />}

              <RegistryFormFooter
                currentStep={currentStep}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            </>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRegistryFormModal;
