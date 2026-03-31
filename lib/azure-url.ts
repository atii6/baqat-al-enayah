
export const getAzureImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";

  // Check if it's an Azure blob storage URL
  const isAzureUrl = url.includes("blob.core.windows.net");
  
  if (!isAzureUrl) return url;

  // If it already has a SAS token (or any query param), don't append another one for now
  // unless we want to replace it. For now, let's just check if it already has 'sig='
  if (url.includes("sig=")) return url;

  const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

  if (!sasToken) {
    console.warn("NEXT_PUBLIC_AZURE_SAS_TOKEN is not defined");
    return url;
  }

  // Append the token. Handle cases where the token might or might not start with '?'
  const separator = url.includes("?") ? "&" : "?";
  const cleanToken = sasToken.startsWith("?") || sasToken.startsWith("&") 
    ? sasToken.substring(1) 
    : sasToken;

  return `${url}${separator}${cleanToken}`;
};
