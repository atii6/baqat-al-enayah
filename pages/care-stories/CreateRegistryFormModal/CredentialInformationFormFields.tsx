import React from "react";
import FormTextField from "@/components/form/Fields/FormTextField";

function CredentialInformationFormFields() {
  return (
    <>
      <FormTextField name="first_name" label="First Name" placeholder="John" />

      <FormTextField name="last_name" label="Last Name" placeholder="Doe" />

      <FormTextField
        name="email"
        label="Email"
        placeholder="john@example.com"
      />

      <FormTextField
        name="password"
        label="Password"
        placeholder="••••••••"
        type="password"
      />
    </>
  );
}

export default CredentialInformationFormFields;
