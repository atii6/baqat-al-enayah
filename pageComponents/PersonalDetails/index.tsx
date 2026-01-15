import React from "react";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormTextField from "@/components/form/Fields/FormTextField";
import z from "zod";
import Form from "@/components/form/Form";
import BooleanCheckboxField from "@/components/form/Fields/BooleanCheckboxField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormFooter from "@/components/form/FormFooter";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { GridItem } from "@/components/grid";
import Typography from "@/components/ui/typography";
import { useUserStore } from "@/store";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import FormSkeleton from "@/components/shared/FormSkeleton";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { toast } from "sonner";

const formSchema = z.object({
  journey: z
    .string()
    .trim()
    .min(50, {
      message: "Please share at least 50 characters about your journey.",
    })
    .max(2500, {
      message: "Journey description must be 2500 characters or less.",
    }),
  street_address: z.string().min(1, {
    message: "Street address is Required.",
  }),
  address_line: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip_code: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Please enter a valid zip code (e.g., 12345 or 12345-6789).",
  }),
  limit_account_access: z.boolean().default(false),
  limit_others_adding_gifts: z.boolean().default(false),
  enable_contribution_alerts: z.boolean().default(false),
  terms_policy: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and policy.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

function PersonalDetailsPage() {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));
  const userID = user.id!;
  const { data: userDetails, isLoading } = useGetUserDetailsByID(userID);
  const { mutateAsync: updateUserDetails, isPending: isPendingUpdate } =
    useUpdateUserDetails();

  const handleBackClick = () => {
    router.push("/dashboard");
  };

  const initialValues = {
    journey: userDetails?.journey || "",
    street_address: userDetails?.street_address || "",
    address_line: userDetails?.address_line || "",
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    zip_code: userDetails?.zip_code || "",
    limit_account_access: userDetails?.limit_account_access || false,
    limit_others_adding_gifts: userDetails?.limit_others_adding_gifts || false,
    enable_contribution_alerts:
      userDetails?.enable_contribution_alerts || false,
    terms_policy: userDetails?.terms_policy || false,
  };

  const handleNextClick = () => {
    router.push("/build-care-registry");
  };

  const handleSubmit = async (values: FormValues) => {
    const newUserDetails = {
      ...values,
      user_id: userID,
    };

    if (userDetails?.id) {
      try {
        await updateUserDetails({
          userDetails: newUserDetails,
          id: userDetails.id,
        });
        toast.success("User details updated.");
        handleNextClick();
      } catch (error) {
        console.warn("Failed to update user details", error);
        toast.error("Failed to update user details");
      }
    }
  };

  return (
    <div
      className={
        "md:mx-6 mx-2 my-4 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] shadow-md border"
      }
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <Form
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          <FormTextareaField
            name="journey"
            label="Share a bit about you."
            placeholder="What's going on, how are you feeling..."
          />

          <FormTextField
            name="street_address"
            label="Address Line 1"
            className="col-span-12 lg:col-span-6"
          />

          <FormTextField
            name="address_line"
            label="Address Line 2"
            className="col-span-12 lg:col-span-6"
          />

          <FormTextField
            // size={isMobile ? 12 : 4}
            className="col-span-12 md:col-span-4"
            name="city"
            label="City"
          />
          <FormTextField
            name="state"
            label="State"
            className="col-span-12 md:col-span-4"
          />
          <FormTextField
            className="col-span-12 md:col-span-4"
            name="zip_code"
            label="Zip Code"
          />
          <GridItem>
            <Typography className="text-sm font-medium text-(--text-primary) mb-1">
              Privacy Settings
            </Typography>
          </GridItem>
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
          <GridItem>
            <Typography className="text-sm font-medium text-(--text-primary) mb-1">
              Terms of Use and Privacy Policy
            </Typography>
          </GridItem>
          <BooleanCheckboxField
            name="terms_policy"
            label={
              <>
                By checking this option, you agree to our{" "}
                <Button variant={"link"} className="p-0 h-fit text-primary">
                  <Link
                    href="/docs/terms-of-use.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Use
                  </Link>
                </Button>{" "}
                and{" "}
                <Button variant={"link"} className="p-0 h-fit text-primary">
                  <Link
                    href="/docs/privacy-policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </Button>
                , including the processing of your data as described. For more
                information, please refer to the links above.
              </>
            }
          />
          <GridItem className="my-4">
            <Separator className="w-full" />
          </GridItem>

          <FormFooter
            submitButtonText="Save"
            IsResetButtonRequired={false}
            onBackButtonClick={handleBackClick}
            renderBackButton={true}
            isSubmitButtonDisabled={isPendingUpdate}
            disableBackButton={isPendingUpdate}
          />
        </Form>
      )}
    </div>
  );
}

export default PersonalDetailsPage;
