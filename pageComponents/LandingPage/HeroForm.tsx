import FormButton from "@/components/form/Fields/FormButton";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import Typography from "@/components/ui/typography";
import React from "react";
import z from "zod";

function HeroForm() {
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
    console.log(value);
  };

  return (
    <div className="relative flex flex-col justify-center bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 w-full max-w-sm mx-auto">
      {/* Decorative divider */}
      <div className="w-10 h-2 rounded-full bg-white mx-auto mb-8" />
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
        >
          <FormTextField
            name="first_name"
            label="First Name"
            placeholder="John"
            labelStyles="text-white"
          />
          <FormTextField
            name="last_name"
            label="Last Name"
            placeholder="Doe"
            labelStyles="text-white"
          />
          <FormTextField
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
            labelStyles="text-white"
          />
          <FormButton className="w-full mt-4">
            Create a Care Registry
          </FormButton>
        </Form>
      </div>
    </div>
  );
}

export default HeroForm;
