import { IncomingForm } from "formidable";
import fs from "fs";
import { uploadFileToAzure } from "../../../lib/azureBlob";
import methodHandler from "@/utils/requestHandler";

export const config = {
  api: {
    bodyParser: false, // must be false for file uploads
  },
};

const handler = async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    console.log("handler==>", err, fields, files);
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("handler==>1");

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("handler==>2", uploadedFile);

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("handler==>3", uploadedFile.filepath);

    // Read file buffer
    const buffer = fs.readFileSync(uploadedFile.filepath); // filepath comes from formidable

    try {
      const response = await uploadFileToAzure(
        buffer,
        uploadedFile.originalFilename,
        uploadedFile.mimetype || "application/octet-stream",
        "uploads",
      );

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

export default methodHandler({
  POST: handler,
});
