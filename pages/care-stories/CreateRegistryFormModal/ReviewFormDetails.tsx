import React from "react";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { GridItem } from "@/components/grid";

function ReviewFormDetails() {
  const { watch } = useFormContext();
  return (
    <GridItem className="space-y-6 animate-fade-in">
      <div className="bg-accent/50 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-foreground">
          Review Your Information
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">Name:</span>
          <span className="text-foreground">
            {watch("first_name")} {watch("last_name")}
          </span>

          <span className="text-muted-foreground">Email:</span>
          <span className="text-foreground">{watch("email")}</span>

          <span className="text-muted-foreground">Registry for:</span>
          <span className="text-foreground capitalize">
            {watch("registryFor") === "myself" ? "Myself" : "Someone Else"}
          </span>

          {watch("registryFor") === "someoneElse" && (
            <>
              <span className="text-muted-foreground">Recipient:</span>
              <span className="text-foreground">{watch("recipientName")}</span>

              <span className="text-muted-foreground">Recipient Email:</span>
              <span className="text-foreground">{watch("recipientEmail")}</span>
            </>
          )}
        </div>

        <div className="pt-2 border-t border-border space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`p-0.5 w-4 h-4 flex items-center justify-center rounded-full shadow-sm ${
                watch("isPublic")
                  ? "text-white bg-primary"
                  : "text-primary bg-white"
              }`}
            >
              <Check />
            </span>

            <span
              className={
                watch("isPublic") ? "text-foreground" : "text-muted-foreground"
              }
            >
              Public Registry
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`p-0.5 w-4 h-4 flex items-center justify-center rounded-full shadow-sm ${
                watch("limitAccessToLinkHolders")
                  ? "text-white bg-primary"
                  : "text-primary bg-white"
              }`}
            >
              <Check />
            </span>

            <span
              className={
                watch("limitAccessToLinkHolders")
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              Limited to link holders
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`p-0.5 w-4 h-4 flex items-center justify-center rounded-full shadow-sm ${
                watch("allowOthersToAddGifts")
                  ? "text-white bg-primary"
                  : "text-primary bg-white"
              }`}
            >
              <Check />
            </span>

            <span
              className={
                watch("allowOthersToAddGifts")
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              Others can add gifts
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`p-0.5 w-4 h-4 flex items-center justify-center rounded-full shadow-sm ${
                watch("emailAlertsForContributions")
                  ? "text-white bg-primary"
                  : "text-primary bg-white"
              }`}
            >
              <Check />
            </span>

            <span
              className={
                watch("emailAlertsForContributions")
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              Email alerts enabled
            </span>
          </div>
        </div>
      </div>
    </GridItem>
  );
}

export default ReviewFormDetails;
