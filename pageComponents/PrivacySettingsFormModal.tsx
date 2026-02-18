import React from "react";
import Form from "@/components/form/Form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import FormFooter from "@/components/form/FormFooter";
import type { UserType } from "@/utilities/types/user";
import type { UserDetailsType } from "@/utilities/types/user-details";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { toast } from "sonner";
import { useWindowSize } from "@/hooks/useWindowSize";
import Typography from "@/components/ui/typography";
import { useUserStore } from "@/store";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import BooleanCheckboxField from "@/components/form/Fields/BooleanCheckboxField";
import { USER_ROLES } from "@/constants";
import { GridItem } from "@/components/grid";
import LoaderLogo from "@/components/shared/loader-logo";

type Props = {
  open: boolean;
  closeDialog: () => void;
  userData?: UserType;
  dialogTitle?: string;
};

function PrivacySettingsFormModal({
  open,
  closeDialog,
  userData,
  dialogTitle,
}: Props) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails, isLoading } = useGetUserDetailsByID(
    userData?.id || 0,
    open,
  );
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();
  const { data: userRole } = useGetRoleById(user?.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.limit_others_adding_gifts;
  const { width } = useWindowSize();

  const validationSchema = z.object({
    limit_account_access: z.boolean().default(false),
    limit_others_adding_gifts: z.boolean().default(false),
    enable_contribution_alerts: z.boolean().default(false),
  });
  const initialValues = {
    limit_account_access: userDetails?.limit_account_access || false,
    limit_others_adding_gifts: userDetails?.limit_others_adding_gifts || false,
    enable_contribution_alerts:
      userDetails?.enable_contribution_alerts || false,
  };

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const updatedUserDetails: UserDetailsType = {
        ...userDetails,
        limit_account_access: values.limit_account_access,
        limit_others_adding_gifts: values.limit_others_adding_gifts,
        enable_contribution_alerts: values.enable_contribution_alerts,
      };
      await updateUserDetails({
        id: userDetails.id,
        userDetails: updatedUserDetails,
      });
      toast.success("Privacy settings updated.");
      closeDialog();
    } catch (error) {
      toast.error(`Failed:${error}`);
    }
  };
  const handleBackClick = () => {
    closeDialog();
  };
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="w-11/12 mx-auto md:max-w-125 max-h-[90vh]">
        {dialogTitle && (
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
        )}

        {isLoading ? (
          <GridItem>
            <LoaderLogo />
          </GridItem>
        ) : (
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <BooleanCheckboxField
              name="limit_account_access"
              label="Limit my GiftWell access to link holders only."
            />
            <BooleanCheckboxField
              name="limit_others_adding_gifts"
              label="Allow others to add gifts or services."
            />
            <BooleanCheckboxField
              name="enable_contribution_alerts"
              label="Get email alerts for new contributions."
            />

            <GridItem className="py-0">
              <Typography size="sm" className="text-red-400">
                {isUserNotAllowed
                  ? "You are not allowed to update privacy settings"
                  : ""}
              </Typography>
            </GridItem>

            <FormFooter
              submitButtonText="Update Settings"
              IsResetButtonRequired={false}
              onBackButtonClick={handleBackClick}
              renderBackButton={true}
              nextButtonType="submit"
              backButtonText={width < 768 ? "" : "Cancel"}
              isSubmitButtonDisabled={isUserNotAllowed}
            />
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PrivacySettingsFormModal;
