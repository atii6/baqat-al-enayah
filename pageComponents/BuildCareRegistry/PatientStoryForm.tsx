import FormSelectField from "@/components/form/Fields/FormSelectField";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import { useRouter } from "next/router";
import React from "react";
import z from "zod";
import { STORY_CATEGORIES } from "../CareStories";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import { useUserStore } from "@/store";
import { Spinner } from "@/components/ui/spinner";
import useUpdateGiftWell from "@/hooks/gift-well/useUpdateGiftWell";
import { toast } from "sonner";

type PatientStoryFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function PatientStoryForm({ setCurrentStep }: PatientStoryFormProps) {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: Giftwell, isLoading } = useGetGiftWellByUserID(
    user.giftWellID || 0,
  );
  const { mutateAsync: updateStory } = useUpdateGiftWell();
  console.log("Giftwell", Giftwell);

  const initialValues = {
    title: Giftwell?.title || "",
    description: Giftwell?.description || "",
    organizer_name: Giftwell?.organizer_name || "",
    support_category: Giftwell?.support_category || "",
    family_photo: "",
  };
  const validationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .trim()
      .min(50, {
        message: "Please share at least 50 characters about your story.",
      })
      .max(2500, {
        message: "Story must be 2500 characters or less.",
      }),
    organizer_name: z.string().min(1, "Organizer name is required"),
    support_category: z.string().min(1, "Need type is required"),
    family_photo: z.string().optional(),
  });

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    const giftwell = {
      ...Giftwell,
      ...values,
      id: Giftwell?.id || 0,
      user_id: Giftwell?.user_id || 0,
      privacy: Giftwell?.privacy || "private",
      family_photo: "/baqat_al_enayah_logo.png",
    };
    await updateStory(
      {
        giftwell,
        id: Giftwell?.id || 0,
      },
      {
        onSuccess: () => {
          toast.success("Story updated successfully");
          handleNextClick();
        },
      },
    );
  };

  const handleBackClick = () => {
    router.push("/dashboard/personal-details");
  };

  const storyCategory = React.useMemo(
    () => STORY_CATEGORIES.filter((category) => category.value !== "all"),
    [],
  );

  if (isLoading) {
    return (
      <div>
        <Spinner />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      containerStyles="gap-0"
    >
      <FormTextField
        name="title"
        label="Registry Title"
        placeholder="Write a title that will appear to people"
      />
      <FormTextareaField
        name="description"
        label="Your Story"
        placeholder="Write your story so that people could understand and help you"
      />
      <FormTextField
        name="organizer_name"
        label="Organizer Name"
        placeholder="Who is managing this registry?"
      />
      <FormSelectField
        name="support_category"
        label="Type of help"
        placeholder="What type of help do you usually need?"
        options={storyCategory}
        className="mb-4"
      />
      <FormTextField name="family_photo" label="Family Photo" type="file" />
      <FormFooter
        onNextClick={handleNextClick}
        renderBackButton
        onBackButtonClick={handleBackClick}
        submitButtonText="Update Story"
      />
    </Form>
  );
}

export default PatientStoryForm;
