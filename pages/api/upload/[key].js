import methodHandler from "@/utils/requestHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { deleteFileFromAzure } from "../../../lib/azureBlob";

async function deleteHandler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: "Missing blob key" });
  }

  try {
    await deleteFileFromAzure(key);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: `Failed to delete file ${error}` });
  }
}

export default methodHandler({
  DELETE: deleteHandler,
});
