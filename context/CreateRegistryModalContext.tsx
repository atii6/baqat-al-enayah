import React from "react";
import { useDialog } from "@/hooks/useDialog";

// Type for prefilled values from HeroForm
interface HeroFormValues {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface CreateCareRegistryModalContextType {
  isOpen: boolean;
  initialValues?: HeroFormValues;
  openModal: (values?: HeroFormValues) => void;
  closeModal: () => void;
}

const CreateCareRegistryModalContext =
  React.createContext<CreateCareRegistryModalContextType>({
    isOpen: false,
    initialValues: undefined,
    openModal: () => {},
    closeModal: () => {},
  });

export const CreateCareRegistryModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    open: isOpen,
    openDialog: openDialog,
    closeDialog: closeDialog,
  } = useDialog(false);
  const [initialValues, setInitialValues] = React.useState<
    HeroFormValues | undefined
  >(undefined);

  const openModal = (values?: HeroFormValues) => {
    setInitialValues(values);
    openDialog();
  };

  const closeModal = () => {
    setInitialValues(undefined);
    closeDialog();
  };

  return (
    <CreateCareRegistryModalContext.Provider
      value={{ isOpen, initialValues, openModal, closeModal }}
    >
      {children}
    </CreateCareRegistryModalContext.Provider>
  );
};

export const useCreateCareRegistryModal = () =>
  React.useContext(CreateCareRegistryModalContext);
