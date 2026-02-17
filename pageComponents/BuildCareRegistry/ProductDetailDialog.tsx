"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditIcon, X } from "lucide-react";
import Image from "next/image";
// import EditIcon from "@/components/svg/EditIcon";
// import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import type { ProductType } from "@/utilities/types/product";
// import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import { useUserStore } from "@/store";
import React from "react";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import { USER_ROLES } from "@/constants";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { Grid, GridItem } from "@/components/grid";
import EllipsisTypography from "@/components/shared/EllipsisTypography";

interface ProductDetailDialogProps {
  product: ProductType | null;
  onAddToList?: (productId: number) => void;
  onRemoveFromList?: (productId: number) => void;
  onEdit?: (productId: number) => void;
  open: boolean;
  closeDialog: () => void;
  productType?: string;
  isLoading?: boolean;
  showCloseButton?: boolean;
}

function ProductDetailDialog({
  product,
  onAddToList,
  onRemoveFromList,
  onEdit,
  open,
  closeDialog,
  productType,
  isLoading = false,
  showCloseButton = true,
}: ProductDetailDialogProps) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails } = useGetUserDetailsByID(user.id || 0);
  const { data: userRole } = useGetRoleById(user?.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.limit_others_adding_gifts;

  const handleAddToList = () => {
    onAddToList?.(product?.id || 0);
  };

  const handleRemoveFromList = () => {
    onRemoveFromList?.(product?.id || 0);
  };

  const handleEdit = () => {
    onEdit?.(product?.id || 0);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="md:max-w-180 md:max-h-108 w-11/12 p-1 rounded-md"
        showCloseButton={showCloseButton}
      >
        <Grid className="relative">
          <div className="flex items-center right-0 top-0 absolute z-20">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className=""
                type="button"
                onClick={handleEdit}
                disabled={isUserNotAllowed}
              >
                <EditIcon width={20} height={21} color="black" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className=""
              type="button"
              onClick={closeDialog}
            >
              <X width={24} color="black" />
            </Button>
          </div>
          <GridItem className="p-1 col-span-12 md:col-span-7">
            <div className="md:h-100 md:w-100  rounded-md">
              <Image
                src={product?.image_url || ""}
                alt={product?.name || ""}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-md border shadow-sm"
              />
            </div>
          </GridItem>
          <GridItem className="relative flex items-center col-span-12 md:col-span-5">
            <div className="w-full space-y-5">
              <div className="flex flex-col gap-1 w-full">
                <EllipsisTypography className="text-[#050708] line-clamp-2">
                  {product?.name || ""}
                </EllipsisTypography>
                <span className="flex gap-1 items-center w-full cursor-pointer">
                  <CheckMarkIcon variant="filled" width={13} height={14} />
                  <EllipsisTypography
                    title={product?.affiliate_link || ""}
                    className="text-[#597FA6] font-bold text-[10px] w-11/12 line-clamp-2"
                  >
                    {product?.affiliate_link || ""}
                  </EllipsisTypography>
                </span>
                <Typography size="md" className="text-[#828383]">
                  {`$${product?.price || "100"}`}
                </Typography>
              </div>
              <div className="space-y-1">
                <Button
                  onClick={handleAddToList}
                  type="button"
                  disabled={
                    productType === "Wish" || isLoading || isUserNotAllowed
                  }
                  className="w-full rounded-full"
                >
                  Add to my Care Registry
                </Button>
                {productType !== "Suggestion" && (
                  <Button
                    onClick={handleRemoveFromList}
                    variant="ghost"
                    type="button"
                    className="w-full text-[#828383]"
                    disabled={isLoading || isUserNotAllowed}
                  >
                    Remove from my Care Registry
                  </Button>
                )}
              </div>
            </div>
          </GridItem>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailDialog;
