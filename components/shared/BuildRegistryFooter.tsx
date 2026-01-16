import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import GridItem, { GridItemProps } from "../grid/GridItem";

type BuildRegistryFooterProps = {
  handleBackClick: () => void;
  handleNextClick: () => void;
  size?: GridItemProps["size"];
  saveButtonText?: string;
  onSaveClick?: () => void;
  disableSaveButton?: boolean;
  showSaveButton?: boolean;
  disableNextButton?: boolean;
  renderBackButton?: boolean;
  backButtonText?: string;
};

function BuildRegistryFooter({
  handleBackClick,
  handleNextClick,
  size = 12,
  saveButtonText = "Next",
  onSaveClick,
  disableSaveButton = false,
  showSaveButton = true,
  disableNextButton = false,
  renderBackButton = true,
  backButtonText = "Back",
}: BuildRegistryFooterProps) {
  return (
    <GridItem size={size} className="gap-8 mt-12">
      <div className="flex justify-between w-full gap-6 md:gap-12">
        {renderBackButton && (
          <div className="border-t border-[#9EB7D1] px-0 w-1/5 lg:w-2/12 py-2">
            <Button
              className="p-0"
              // variant={"ghost"}
              size={"lg"}
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2" size={20} />
              {backButtonText}
            </Button>
          </div>
        )}

        <div
          className={cn(
            "flex px-0 border-t border-[#9EB7D1] py-2 w-4/5 lg:w-10/12",
            showSaveButton ? "justify-between" : "justify-end",
            renderBackButton ? "" : "w-full!"
          )}
        >
          {showSaveButton && (
            <Button
              // variant={"ghost"}
              disabled={disableSaveButton}
              className="text-white"
              onClick={onSaveClick}
            >
              {saveButtonText}
            </Button>
          )}
          <Button
            className="p-0"
            // variant={"ghost"}
            size={"lg"}
            onClick={handleNextClick}
            disabled={disableNextButton}
          >
            Next
            <ArrowRight className="ml-2" size={20} />
          </Button>
          {/* <Button
            variant="ghost"
            className="p-0"
            disabled={disableNextButton}
            onClick={handleNextClick}
          >
            <ArrowRight size={20} className="text-primary" />
          </Button> */}
        </div>
      </div>
    </GridItem>
  );
}

export default BuildRegistryFooter;
