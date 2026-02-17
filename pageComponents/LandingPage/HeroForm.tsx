import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

function HeroForm() {
  const [isSignInForm, setIsSignInForm] = React.useState<boolean>(false);

  return (
    <div className="relative flex flex-col justify-center bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 w-full max-w-sm mx-auto">
      {/* Decorative divider */}
      <div className="w-10 h-2 rounded-full bg-white mx-auto mb-8" />
      {!isSignInForm && <SignupForm setIsSignInForm={setIsSignInForm} />}
      {isSignInForm && <SigninForm setIsSignInForm={setIsSignInForm} />}
    </div>
  );
}

export default HeroForm;
