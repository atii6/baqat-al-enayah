"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, FacebookIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store";
import Link from "next/link";
import { Grid, GridItem } from "@/components/grid";
import { Separator } from "@/components/ui/separator";

interface ShareSupportDialogProps {
  open: boolean;
  closeDialog: () => void;
}

function ShareSupportDialog({ open, closeDialog }: ShareSupportDialogProps) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const registryUrl = `${BASE_URL}/registry/${user.id}`;
  const handleCopyUrl = async () => {
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(registryUrl);
        toast.info("URL copied to clipboard.");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = registryUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          toast.info("URL copied to clipboard.");
        } else {
          throw new Error("Fallback copy command failed");
        }
      }
    } catch (err) {
      toast.error(`Failed to copy URL :${err}`);
    }
  };

  const emailSubject = encodeURIComponent("Check out my support registry!");
  const emailBody = encodeURIComponent(
    `Here's the link to my support registry: ${registryUrl}`,
  );
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="lg:min-w-156.25 lg:max-h-[90vh] p-3 lg:p-6 w-11/12 bg-white rounded-md ">
        <DialogHeader className="text-start flex flex-row items-center justify-between">
          <DialogTitle className="lg:text-lg text-sm">
            Share and get the help you really need!
          </DialogTitle>
        </DialogHeader>

        <Grid>
          <GridItem className="my-2 w-full">
            <Separator />
          </GridItem>

          <GridItem className="relative">
            <Input
              value={registryUrl}
              readOnly
              autoFocus={false}
              tabIndex={-1}
              className="pr-12 text-[#A3A3A3] cursor-text select-text"
              onFocus={(e) => e.target.select()}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyUrl}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 z-10 group text-[#A3A3A3] hover:text-[#466B90]"
            >
              <CopyIcon />
            </Button>
          </GridItem>
          <GridItem>
            <Separator className="my-2 w-full" />
          </GridItem>

          <GridItem className="flex items-center justify-between col-span-12 md:col-span-6">
            <Link
              className="w-full"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                registryUrl,
              )}`}
              target="_blank"
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 h-12 text-sm bg-white hover:border-[#466B90]"
              >
                <FacebookIcon />
                Facebook
              </Button>
            </Link>
          </GridItem>

          <GridItem className="flex items-center justify-between col-span-12 md:col-span-6">
            <Link
              className="w-full"
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 h-12 bg-white hover:border-[#466B90]"
              >
                <MailIcon />
                Email
              </Button>
            </Link>
          </GridItem>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ShareSupportDialog;
