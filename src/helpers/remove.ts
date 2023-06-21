// Accessing the file system to delte the file that contains the duplicated user
const fs = require('fs')

const removeFile = function (filePath:any) {
  try {
    // get the file path and remove it from the filesystem
    fs.unlink(filePath, (err:any) => {
      if (err) {
        console.error(err)
        return
      }
    })
    console.log('File"' + filePath + '" removed!')
  } catch (err) {
    throw err
  }
}
export {};
module.exports = removeFile;