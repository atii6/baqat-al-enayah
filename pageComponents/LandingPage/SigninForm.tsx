import React from "react";
import FormButton from "@/components/form/Fields/FormButton";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import { GridItem } from "@/components/grid";
import { Button } from "@/components/ui/button";
import z from "zod";
import Typography from "@/components/ui/typography";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

type Props = { setIsSignInForm: React.Dispatch<React.SetStateAction<boolean>> };

function SigninForm({ setIsSignInForm }: Props) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (value: z.infer<typeof validationSchema>) => {
    const { email, password } = value;
    const response = await signIn("credentials", {
      redirect: false,
      callbackUrl: ROUTES.DASHBOARD.pathName,
      email,
      password,
    });
    if (response?.error) {
      toast.error(response.error);
    }
  };
  return (
    <div className="space-y-3">
      <Typography
        variant="h1"
        className="text-white font-semibold text-center text-xl"
      >
        Welcome Back
      </Typography>
      <Typography
        variant="caption"
        className="text-white/70 text-sm text-center"
      >
        Sign in to continue to your Care Registry.
      </Typography>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        containerStyles="gap-1"
      >
        <FormTextField
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
          className="text-white"
        />
        <FormTextField
          name="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          className="text-white"
        />
        <GridItem className="m-0 p-0">
          <span className="text-white/90 text-sm">
            Don&apos;t have an account ?{" "}
            <Button
              variant="link"
              type="button"
              className="p-0 font-bold text-secondary cursor-pointer"
              onClick={() => setIsSignInForm(false)}
            >
              Register
            </Button>
          </span>
        </GridItem>
        <FormButton className="w-full mt-4">Sign In</FormButton>
      </Form>
    </div>
  );
}

export default SigninForm;
