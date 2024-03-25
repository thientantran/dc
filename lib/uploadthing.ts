import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader
} from "@uploadthing/react";

import type { ourFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<ourFileRouter>();
export const UploadDropzone = generateUploadDropzone<ourFileRouter>();
export const Uploader = generateUploader<ourFileRouter>();