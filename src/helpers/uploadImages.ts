const cloudinary = require("./cloudinary");
const remove = require("./remove");
const { Request, Response } = require("express");

const imageHelper = async (
    req: typeof Request,
    res: typeof Response,
    model: any,
    name: string
  ) => {
    try {
      console.log(JSON.stringify(req.body));
      console.log("image uploaded", req.file);
      // Replace the previous file with the new one uploaded from the user
      const result = await cloudinary.uploader.upload(req.file?.path, {
        public_id: `${req.body._id}_${name}`,
        width: 500,
        height: 500,
        crop: "fill",
      });
  
      // Replace the existing file with the new file URL from Cloudinary
      const updatedImage = await model.findByIdAndUpdate(
        req.body._id,
        { image: result.url },
        { new: true }
      );
      // Remove the file from storage to prevent overflow
      remove(req.file?.path);
  
      res.status(201).json({
        success: true,
        message: name + " Card was updated",
      });
    } catch (error: any) {
      console.log("Error while uploading card image", error?.message);
      res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };
export {}
module.exports = {
    imageHelper
}