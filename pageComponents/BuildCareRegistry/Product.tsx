import React from "react";
import Typography from "@/components/ui/typography";
import { useDialog } from "@/hooks/useDialog";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/router";
import { isValidUrl } from "@/utilities/helpers/customValidations";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import useCreateRegistryItem from "@/hooks/registry-item/useCreateRegistryItem";
import { useUserStore } from "@/store";
import useDeleteRegistryItem from "@/hooks/registry-item/useDeleteRegistryItem";
import type {
  RegistryItemsStatusType,
  RegistryItemType,
} from "@/utilities/types/registryItem";
import { toast } from "sonner";
import useFetchProductMeta from "@/hooks/product-meta/useFetchProductMeta";
import type { ProductType } from "@/utilities/types/product";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { useGetSuggestedProducts } from "@/hooks/useGetSuggestedProducts";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Grid, GridItem } from "@/components/grid";
import TextField from "@/components/shared/fields/text-field";
import ProductCard from "../Shop/ProductCard";
import { Globe } from "lucide-react";
import BuildRegistryFooter from "@/components/shared/BuildRegistryFooter";
import ProductDetailDialog from "./ProductDetailDialog";
import AddProductDialog from "./AddProductDialog";

type ProductProps = {
  registryItems: RegistryItemType[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function Product({ registryItems, setCurrentStep }: ProductProps) {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));

  const [productLink, setProductLink] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [selectedRegistryItem, setSelectedRegistryItem] =
    React.useState<RegistryItemType | null>(null);

  const [productType, setProductType] = React.useState<string>("");
  const [linkError, setLinkError] = React.useState("");

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { data: allProducts, isLoading } = useGetAllProducts();

  const { data: userDetails } = useGetUserDetailsByID(user.id || 0);
  const { mutateAsync: createRegistryItem, isPending: isCreating } =
    useCreateRegistryItem();
  const { mutateAsync: deleteRegistryItem, isPending: isDeleting } =
    useDeleteRegistryItem();
  const { mutateAsync: fetchProductMeta, isPending } = useFetchProductMeta();

  const userRegistryProducts: RegistryItemType[] = registryItems?.map(
    (items) => {
      return {
        id: items.id,
        order_index: items.order_index,
        giftwell_id: items.giftwell_id,
        product: {
          ...items.registry_product,
          price: items.registry_product?.price || 0,
          id: items.registry_product?.id || 0,
          name: items.registry_product?.name || "",
          registryItemID: items.id,
          quantity: items.quantity,
          status: items.status,
        },
        quantity: items.quantity,
        product_id: items.product_id,
        status: items.status,
      };
    },
  );

  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const {
    open: isProductDialogOpen,
    openDialog: openProductDialog,
    closeDialog: closeProductDialog,
  } = useDialog(false);

  const {
    open: isAddProductDialogOpen,
    openDialog: openAddProductDialog,
    closeDialog: closeAddProductDialog,
  } = useDialog(false);

  const handleWishProduct = (
    registriItem: RegistryItemType,
    registryProduct: ProductType,
    ProductType: "Wish" | "Suggestion",
  ) => {
    setProductType(ProductType);
    if (registriItem && registryProduct) {
      setSelectedProduct(registryProduct);
      setSelectedRegistryItem(registriItem);
    }

    openProductDialog();
  };

  const handleSuggestionClick = (
    product: ProductType,
    ProductType: "Wish" | "Suggestion",
  ) => {
    setProductType(ProductType);
    setSelectedProduct(product);
    openProductDialog();
  };
  const nextOrderIndex =
    Math.max(
      0,
      ...(userRegistryProducts?.map((item) => item.order_index ?? 0) ?? []),
    ) + 1;

  const handleAddToList = async () => {
    if (selectedProduct) {
      try {
        const registryItemData = {
          giftwell_id: user.giftWellID!,
          product_id: Number(selectedProduct.id),
          status: "listed" as RegistryItemsStatusType,
          registry_product: {
            ...selectedProduct,
          },
          quantity: 1,
          order_index: nextOrderIndex,
        };

        await createRegistryItem({ registryItemData });
        setSelectedProduct(null);
        toast.success("Registry item added successfully");
      } catch (error) {
        toast.error("Failed to add registry item");
      }
    }
    closeProductDialog();
  };

  const handleRemoveFromList = async () => {
    if (selectedProduct) {
      const productToRemove = userRegistryProducts?.find(
        (item) => item.product_id === selectedProduct.id,
      );
      await deleteRegistryItem(productToRemove?.id || 0);
    }

    closeProductDialog();
  };

  const handleEdit = (id: number) => {
    const filteredItems = registryItems?.find((item) => item.product_id === id);
    if (filteredItems?.registry_product) {
      setSelectedProduct(
        (prev) =>
          ({
            ...prev,
            ...filteredItems?.registry_product,
            id: filteredItems?.registry_product?.id || prev?.id || 0,
          }) as ProductType,
      );
    }

    setSelectedRegistryItem(filteredItems!);
    closeProductDialog();
    openAddProductDialog();
  };
  const handleSave = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onNextClick = async () => {
    setSelectedProduct(null);
    setProductType("");
    const response = await fetchProductMeta({ productLink });

    if (response) {
      setSelectedProduct({
        id: Number(Date.now().toString()),
        name: response.title,
        image_url: response.image,
        price: Number(response.price),
        description: response.description,
        affiliate_link: productLink,
        category: 2,
      });
    }
    if (!isPending) {
      openAddProductDialog();
    }
  };

  const handleChange = (value: string) => {
    setProductLink(value);

    if (!value || isValidUrl(value)) {
      setLinkError("");
    } else {
      setLinkError("Enter valid URL");
    }
  };

  const suggestedProducts: ProductType[] = useGetSuggestedProducts({
    allProducts,
    userRegistryProducts,
    preferredCategories: [],
  });

  const handleCloseAddProductDialog = () => {
    setProductLink("");
    setProductType("");
    setSelectedProduct(null);
    setSelectedRegistryItem(null);
    closeAddProductDialog();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <>
      <Grid className="grid-cols-12 gap-6">
        <TextField
          name="link"
          label="Paste a product link from anywhere on the web"
          placeholder="https://"
          renderFieldButton
          disableFieldButton={
            productLink === "" || isPending || !isValidUrl(productLink)
          }
          fieldButtonText={isPending ? "Fetching product..." : "Next"}
          onFieldButtonClick={onNextClick}
          value={productLink}
          onChange={(e) => handleChange(e.target.value)}
          error={linkError}
          className="col-span-12"
        />
        <GridItem>
          <Separator className="my-3" />
        </GridItem>

        <GridItem>
          <Typography size="md" className=" text-[#262626]">
            My Care Registry
          </Typography>
        </GridItem>

        {userRegistryProducts?.length === 0 ? (
          <GridItem className={"flex items-center justify-center"}>
            <Typography size="md" className=" text-[#A3A3A3]">
              Add Products to your wish list now
            </Typography>
          </GridItem>
        ) : (
          userRegistryProducts?.map((items, index) => (
            <GridItem
              key={index}
              className={
                "col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              }
            >
              <ProductCard
                index={index}
                product={items.product}
                onCardClick={() =>
                  handleWishProduct(items, items.product!, "Wish")
                }
              />
            </GridItem>
          ))
        )}
        <GridItem>
          <Separator className="border-t-2 my-3" />
        </GridItem>

        <GridItem>
          <Typography size="md" className=" text-[#262626]">
            Product suggestions
          </Typography>
        </GridItem>

        <>
          {suggestedProducts?.map((product, index) => (
            <GridItem
              key={index}
              className={
                "col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              }
            >
              <ProductCard
                index={index}
                product={product}
                onCardClick={() => handleSuggestionClick(product, "Suggestion")}
              />
            </GridItem>
          ))}

          <GridItem
            className={`col-span-12 md:col-span-4 xl:col-span-3  ${
              isMobile ? "flex items-center justify-center" : ""
            }`}
          >
            <div
              onClick={() => router.push("/explore")}
              className="w-full h-full min-h-72 max-w-52 hover:cursor-pointer hover:bg-[#e9f1fa] flex flex-col items-start justify-between rounded-lg bg-[#EFF7FF] shadow-sm border border-[#EFF7FF] p-8"
            >
              <Globe />
              <Typography size="xl" className="text-[#385C80] font-bold">
                Explore
              </Typography>
            </div>
          </GridItem>
        </>
        <GridItem>
          <Separator className="my-3" />
        </GridItem>

        <BuildRegistryFooter
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
          onSaveClick={handleSave}
          saveButtonText="Save Details"
        />
      </Grid>

      {isProductDialogOpen && (
        <ProductDetailDialog
          open={isProductDialogOpen}
          closeDialog={closeProductDialog}
          onAddToList={handleAddToList}
          onRemoveFromList={handleRemoveFromList}
          onEdit={handleEdit}
          product={selectedProduct}
          productType={productType}
          isLoading={isCreating || isDeleting}
          showCloseButton={false}
        />
      )}

      {isAddProductDialogOpen && !isPending && (
        <AddProductDialog
          open={isAddProductDialogOpen}
          closeDialog={handleCloseAddProductDialog}
          affiliateLink={productLink}
          selectedProduct={selectedProduct}
          selectedRegistryItem={selectedRegistryItem}
          giftWellID={user.giftWellID!}
          registryItemOrderIndex={nextOrderIndex}
          productType={productType}
        />
      )}
    </>
  );
}

export default Product;
