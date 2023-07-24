import fs from "fs";

const removeFile = function (filePath: any) {
  return new Promise<void>((resolve, reject) => {
    // get the file path and remove it from the filesystem
    fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log('File "' + filePath + '" removed!');
      resolve();
    });
  });
};

export { removeFile };
