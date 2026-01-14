import React from "react";
import FormCardSelect from "@/components/form/Fields/FormCardSelect";
import { User, Users } from "lucide-react";
import FormTextField from "@/components/form/Fields/FormTextField";
import FormSwitchButton from "@/components/form/Fields/FormSwitchButton";
import Typography from "@/components/ui/typography";
import { useFormContext } from "react-hook-form";

function RegistryTypeFormFields() {
  const { watch } = useFormContext();
  const registryFor = watch("registryFor");
  return (
    <div className="space-y-6 animate-fade-in col-span-12">
      <FormCardSelect
        name="registryFor"
        label="Creating registry for"
        labelStyles="text-white"
        options={[
          {
            value: "myself",
            label: "Myself",
            icon: User,
          },
          {
            value: "someoneElse",
            label: "Someone Else",
            icon: Users,
          },
        ]}
      />

      {registryFor === "someoneElse" && (
        <>
          <FormTextField
            name="recipientFirstName"
            label="Recipient First Name"
            placeholder="Recipient's first name"
            className="mb-0"
          />
          <FormTextField
            name="recipientLastName"
            label="Recipient Last Name"
            placeholder="Recipient's last name"
            className="mb-0"
          />
          <FormTextField
            name="recipientEmail"
            label="Recipient Email"
            placeholder="recipient@example.com"
          />
        </>
      )}

      <div className="space-y-4 pt-4 border-t border-border">
        <FormSwitchButton
          name="isPublic"
          label="Public Registry"
          className="mb-2"
        />
        <FormSwitchButton
          name="limitAccessToLinkHolders"
          label="Limit my GiftWell access to link holders only"
          className="mb-2"
        />
        <FormSwitchButton
          name="allowOthersToAddGifts"
          label="Allow others to add gifts or services"
          className="mb-2"
        />
        <FormSwitchButton
          name="emailAlertsForContributions"
          label="Get email alerts for new contributions"
          className="mb-2"
        />
        <Typography size="sm" className="text-muted-foreground">
          These settings can be changed later in your account settings.
        </Typography>
      </div>
    </div>
  );
}

export default RegistryTypeFormFields;
