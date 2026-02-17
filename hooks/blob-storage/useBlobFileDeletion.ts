import { useMutation } from "@tanstack/react-query";

export function useAzureDelete() {
  const deleteFileFromAzure = async (blobName: string) => {
    const response = await fetch(
      `/api/delete?key=${encodeURIComponent(blobName)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Failed to delete file from Azure");
    }

    return true;
  };

  const mutation = useMutation({
    mutationFn: deleteFileFromAzure,
  });

  return {
    deleteFile: mutation.mutateAsync,
    ...mutation,
  };
}
