import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER!;

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient(containerName);

export async function uploadFileToAzure(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder?: string,
) {
  const blobName = folder
    ? `${folder}/${Date.now()}-${fileName}`
    : `${Date.now()}-${fileName}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: contentType,
    },
  });

  return {
    url: blockBlobClient.url,
    blobName,
  };
}

export async function deleteFileFromAzure(blobName: string) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const exists = await blockBlobClient.exists();

  if (!exists) {
    throw new Error("File does not exist in Azure");
  }

  await blockBlobClient.delete();

  return { success: true };
}
