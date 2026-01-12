"use client";

import { Grid, GridItem } from "@/components/grid";
import BuildCareRegistry from "@/pageComponents/BuildCareRegistry";
import PersonalDetailsPage from "@/pageComponents/PersonalDetails";
import PreviewAndPublish from "@/pageComponents/PreviewAndPublish";
import { usePathname } from "next/navigation";

function UserProfile() {
  const pathname = usePathname();
  const route = pathname || "";

  const renderContent = () => {
    switch (route) {
      case "/personal-details":
        return <PersonalDetailsPage />;
      case "/build-care-registry":
        return <BuildCareRegistry />;
      case "/preview-and-publish":
        return <PreviewAndPublish />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p>The route &quot;{route}&quot; is not recognized.</p>
            <p className="text-muted-foreground mt-2">
              Current pathname: {pathname}
            </p>
          </div>
        );
    }
  };

  return (
    <Grid>
      <GridItem className="py-0">{renderContent()}</GridItem>
    </Grid>
  );
}

export default UserProfile;
