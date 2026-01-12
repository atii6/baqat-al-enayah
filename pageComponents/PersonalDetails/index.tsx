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

const formSchema = z.object({
  journey: z
    .string()
    .min(15, {
      message: "Please share at least 10 characters about your journey.",
    })
    .max(2500, {
      message: "Journey description must be 240 characters or less.",
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
  limitAccess: z.boolean().default(false),
  allowOthers: z.boolean().default(false),
  emailAlerts: z.boolean().default(false),
  terms_policy: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and policy.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

function PersonalDetailsPage() {
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/dashboard");
  };

  const initialValues = {
    journey: "",
    street_address: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    limitAccess: false,
    allowOthers: false,
    emailAlerts: false,
    terms_policy: false,
  };

  const handleSubmit = async (values: FormValues) => {
    console.log("handleSubmit", values);
    router.push("/build-care-registry");
    // const newUserDetails = {
    //   ...values,
    //   // user_id: userID,
    //   terms_policy: values.terms_policy,
    // };
    // const fieldsToCompare = [
    //   "journey",
    //   "street_address",
    //   "address_line",
    //   "city",
    //   "state",
    //   "zip_code",
    //   "privacy_settings",
    //   "terms_policy",
    // ];
    // const isChanged = fieldsToCompare.some((key) => {
    //   const oldValue = (userDetails as any)[key];
    //   const newValue = (newUserDetails as any)[key];
    //   if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    //     return (
    //       oldValue.length !== newValue.length ||
    //       oldValue.some((v, i) => v !== newValue[i])
    //     );
    //   }
    //   return oldValue !== newValue;
    // });
    // if (!isChanged) {
    //   handleNextClick();
    //   return;
    // }
    // if (userDetails?.id) {
    //   try {
    //     await updateUserDetails({
    //       userDetails: newUserDetails,
    //       id: userDetails.id,
    //     });
    //     toast.success("User details updated.");
    //     handleNextClick();
    //   } catch (error) {
    //     toast.error("Failed to update user details");
    //   }
    // }
  };

  return (
    <div
      className={
        "md:mx-6 mx-2 my-4 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] shadow-md border"
      }
    >
      {/* {false ? (
        <FormSkeleton />
      ) : ( */}
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
          name="limitAccess"
          label="Limit my GiftWell access to link holders only."
        />
        <BooleanCheckboxField
          name="allowOthers"
          label="Allow others to add gifts or services."
        />
        <BooleanCheckboxField
          name="emailAlerts"
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
        />
      </Form>
      {/* )} */}
    </div>
  );
}

export default PersonalDetailsPage;
