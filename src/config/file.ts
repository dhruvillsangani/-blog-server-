import fs from "fs";
import { logger } from "./logger_config";

const deleteFile = (filePath: fs.PathLike) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
    logger.info(filePath + " deleted successfully");
  });
};

export { deleteFile };
