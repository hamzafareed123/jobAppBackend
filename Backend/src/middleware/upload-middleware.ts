import multer from "multer";
import path from "path";
import fs from "fs";
import { customError } from "../utils/customError";
import { STATUS_CODE } from "../constants/statusCode";

const uploadPath = "upload";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFolder = "Job-Files";

    const folder = path.join(uploadPath, subFolder);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = [".pdf", ".doc", ".docx"];

  if (
    !allowedMimeTypes.includes(file.mimetype) ||
    !allowedExtensions.includes(ext)
  ) {
    return cb(
      new customError(
        "Only PDF and Word documents are allowed",
        STATUS_CODE.UNSUPPORTED_MEDIA_TYPE,
      ),
    );
  }

  cb(null, true);
};

const uploadJobDoc = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadJobDoc;
