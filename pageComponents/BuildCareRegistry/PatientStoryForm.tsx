import React from "react";
import FormSelectField from "@/components/form/Fields/FormSelectField";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import { useRouter } from "next/router";
import z from "zod";
import { STORY_CATEGORIES } from "../CareStories";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import { useUserStore } from "@/store";
import { Spinner } from "@/components/ui/spinner";
import useUpdateGiftWell from "@/hooks/gift-well/useUpdateGiftWell";
import { toast } from "sonner";
import { GridItem } from "@/components/grid";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { useAzureUpload } from "@/hooks/blob-storage/useBlobFileUpload";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAzureImageUrl } from "@/lib/azure-url";

type PatientStoryFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function PatientStoryForm({ setCurrentStep }: PatientStoryFormProps) {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: Giftwell, isLoading } = useGetGiftWellByUserID(user.id || 0);
  const { mutateAsync: updateStory } = useUpdateGiftWell();
  const [rawImageUrl, setRawImageUrl] = React.useState<string | null>(null);
  const previewUrl = React.useMemo(() => getAzureImageUrl(rawImageUrl), [rawImageUrl]);
  const { uploadFile, isPending } = useAzureUpload();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  console.log("Giftwell", Giftwell);

  React.useEffect(() => {
    setRawImageUrl(Giftwell?.family_photo || "");
  }, [Giftwell]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const initialValues = {
    title: Giftwell?.title || "",
    description: Giftwell?.description || "",
    organizer_name: Giftwell?.organizer_name || "",
    support_category: Giftwell?.support_category || "",
    family_photo: Giftwell?.family_photo || "",
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
    family_photo: z.union([z.string(), z.instanceof(File)]).optional(),
  });

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      const response = await uploadFile({
        file,
      });
      setRawImageUrl(response.url);
    } catch (error) {
      toast.error("Profile image upload failed.");
    }
  };

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    let imageUrl = rawImageUrl || "";

    try {
      if (values.family_photo instanceof File) {
        const response = await uploadFile({
          file: values.family_photo,
        });
        imageUrl = response.url;
      }
    } catch (err) {
      toast.error(`Image upload failed: ${err}`);
      return;
    }
    const giftwell = {
      ...Giftwell,
      ...values,
      id: Giftwell?.id || 0,
      user_id: Giftwell?.user_id || 0,
      privacy: Giftwell?.privacy || "private",
      family_photo: imageUrl,
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
          setRawImageUrl("");
        },
      },
    );
  };

  const handleBackClick = () => {
    router.push("/personal-details");
    setRawImageUrl("");
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
      <GridItem className="mb-4">
        <div className="relative group w-full h-60 rounded-sm overflow-hidden border border-gray-300 shadow-md">
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="article-image"
              width={500}
              height={500}
              unoptimized={true}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 gap-3">
              <Typography size="xl" className="font-semibold text-gray-700">
                Add Family Photo
              </Typography>
            </div>
          )}

          <div
            onClick={!isPending ? handleImageClick : undefined}
            className={`absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${
              isPending && "hidden"
            }`}
            title="Add Family Photo"
          >
            <CameraIcon className="text-white" />
          </div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            name="featured_image"
            ref={fileInputRef}
            onChange={handleProfileImageUpload}
            disabled={isPending}
            title="Add Family Photo"
          />
          {isPending && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
              <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </GridItem>
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
