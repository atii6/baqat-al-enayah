import React from "react";
import FormButton from "@/components/form/Fields/FormButton";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import { GridItem } from "@/components/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCreateCareRegistryModal } from "@/context/CreateRegistryModalContext";
import z from "zod";

type Props = { setIsSignInForm: React.Dispatch<React.SetStateAction<boolean>> };

function SignupForm({ setIsSignInForm }: Props) {
  const { openModal } = useCreateCareRegistryModal();
  const intialValues = {
    first_name: "",
    last_name: "",
    email: "",
  };

  const validationSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email("Invalid email address"),
  });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const handleSubmit = (value: ValidationSchemaType) => {
    openModal(value);
  };
  return (
    <div className="space-y-3">
      {/* Title */}
      <Typography
        variant="h1"
        className="text-white font-semibold text-center text-xl"
      >
        Start a Care Registry
      </Typography>
      <Typography
        variant="caption"
        className="text-white/70 text-sm text-center"
      >
        Create your registry and let others support you.
      </Typography>

      <Form
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        containerStyles="gap-1"
      >
        <FormTextField
          name="first_name"
          label="First Name"
          placeholder="John"
          labelStyles="text-white"
          className="text-white"
        />
        <FormTextField
          name="last_name"
          label="Last Name"
          placeholder="Doe"
          labelStyles="text-white"
          className="text-white"
        />
        <FormTextField
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
          labelStyles="text-white"
          className="text-white"
        />
        <GridItem className="m-0 p-0">
          <span className="text-white/90 text-sm">
            Already have an account ?{" "}
            <Button
              variant="link"
              type="button"
              className="p-0 font-bold text-secondary cursor-pointer"
              onClick={() => setIsSignInForm(true)}
            >
              Sign in
            </Button>
          </span>
        </GridItem>
        <FormButton className="w-full mt-4">Create a Care Registry</FormButton>
      </Form>
    </div>
  );
}

export default SignupForm;
