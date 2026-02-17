import { useMutation } from "@tanstack/react-query";

interface UploadParams {
  file: File;
}

interface UploadResponse {
  url: string;
  blobName: string;
}

export function useAzureUpload() {
  const uploadFileToAzure = async ({
    file,
  }: UploadParams): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "File upload failed");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: uploadFileToAzure,
  });

  return {
    uploadFile: mutation.mutateAsync,
    ...mutation,
  };
}
