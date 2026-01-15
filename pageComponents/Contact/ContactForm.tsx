import React from "react";
import FormButton from "@/components/form/Fields/FormButton";
import FormSelectField from "@/components/form/Fields/FormSelectField";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import Typography from "@/components/ui/typography";
import { Send } from "lucide-react";
import z from "zod";
import useContactUs from "@/hooks/contact-us/useContactUs";
import { toast } from "sonner";

const selectOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Support Request", value: "support" },
  { label: "Partnership Opportunity", value: "partnership" },
  { label: "Feedback & Suggestions", value: "feedback" },
  { label: "Volunteer Interest", value: "volunteer" },
  { label: "Other", value: "other" },
];

function ContactForm() {
  const { mutateAsync: sendEmail } = useContactUs();

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    subject: z.string(),
    message: z.string().min(1, "Message is required"),
  });

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      const result = await sendEmail(values);

      if (!result.success) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success("Message sent successfully!");
      return true;
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  };

  return (
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-primary flex items-center justify-center">
          <Send className="text-primary-foreground" />
        </div>
        <div>
          <Typography className="font-heading text-2xl font-bold text-foreground">
            Send a Message
          </Typography>
          <Typography className="text-muted-foreground text-sm">
            Fill out the form below
          </Typography>
        </div>
      </div>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        resetAfterSubmit
      >
        <FormTextField
          name="name"
          label="Your Name"
          placeholder="John Doe"
          className="col-span-12 md:col-span-6"
        />
        <FormTextField
          name="email"
          label="Email Address"
          placeholder="john.doe@example.com"
          className="col-span-12 md:col-span-6"
        />
        <FormSelectField
          name="subject"
          label="Subject"
          placeholder="Select a topic"
          options={selectOptions}
        />
        <FormTextareaField
          name="message"
          label="Message"
          placeholder="Tell us how we can help you..."
        />
        <FormButton containerStyles="col-span-12" className="w-full md:w-auto">
          <Send />
          Send Message
        </FormButton>
      </Form>
    </div>
  );
}

export default ContactForm;
