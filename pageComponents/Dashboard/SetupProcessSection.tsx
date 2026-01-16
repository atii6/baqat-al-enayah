import React from "react";
import { CircleCheck } from "lucide-react";
import { Grid, GridItem } from "@/components/grid";
import RegistrySetupCards from "./RegistrySetupCards";
import { REGISTRY_STEPS } from "@/constants/registrySteps";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import useGetUserByID from "@/hooks/user/useGetUserByID";

export type CardData = {
  id: number;
  title: string;
  isCompleted?: boolean;
};

const titleToUrlMap: Record<string, string> = {
  "Personal Details": "personal-details",
  "Build Your Care Registry": "build-care-registry",
  "Preview & Publish": "preview-and-publish",
  "Share & Receive Meaningful Support!": "share-and-receive",
};

const SetupProcessSection = () => {
  const router = useRouter();
  const storedUser = useUserStore(React.useCallback((state) => state, []));

  const userID = storedUser.id!;
  const { data: user } = useGetUserByID(userID);

  const isRegistrySetupCompleted =
    user?.isRegistrySetupCompleted &&
    user?.isPersonalDetailsCompleted &&
    user.isRegistryPublished;

  const handleCardClick = (cardData?: CardData) => {
    const title = cardData?.title;
    const urlPath =
      titleToUrlMap[title!] ||
      title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (urlPath === "share-and-receive") {
      // openShareSupportDialog();
      return;
    }

    router.push(`/${urlPath}`);
  };

  const updatedRegistrySteps = REGISTRY_STEPS.map((step) => {
    if (step.title === "Personal Details") {
      return {
        ...step,
        isCompleted: user?.isPersonalDetailsCompleted,
        isDisabled: false,
      };
    }
    if (step.title === "Build Your Care Registry") {
      return {
        ...step,
        isCompleted: user?.isRegistrySetupCompleted,
        isDisabled: !user?.isPersonalDetailsCompleted,
      };
    }
    if (step.title === "Preview & Publish") {
      return {
        ...step,
        isCompleted: user?.isRegistryPublished,
        isDisabled:
          !user?.isRegistrySetupCompleted || !user?.isPersonalDetailsCompleted,
      };
    }
    if (step.title === "Share & Receive Meaningful Support!") {
      return {
        ...step,
        isCompleted: isRegistrySetupCompleted,
        isDisabled: !isRegistrySetupCompleted,
      };
    }
    return step;
  });

  const stepsCount = updatedRegistrySteps.filter(
    (step) => step.isCompleted
  ).length;

  return (
    <section className="mt-10 mb-5 mx-6 p-6 shadow-md rounded-md border">
      <Grid className="gap-4">
        <GridItem className="py-0 space-y-2">
          <Typography size="xl" className="font-bold text-muted-foreground">
            Finish your registry setup
          </Typography>
          <div className="flex items-center gap-2">
            <CircleCheck className="fill-secondary text-white" />
            <Typography variant="caption" className="text-muted-foreground">
              {`You’ve finished ${stepsCount} of ${REGISTRY_STEPS.length}`}
            </Typography>
          </div>
        </GridItem>
        {updatedRegistrySteps.map((step) => (
          <RegistrySetupCards
            key={step.id}
            cardData={step}
            onCardClick={handleCardClick}
          />
        ))}
      </Grid>
    </section>
  );
};

export default SetupProcessSection;
