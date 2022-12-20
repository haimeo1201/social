const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath = "./public/";
    const ext = path.extname(file.originalname);
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      destinationPath += "image/";
      if (req.body.type === "post") {
        destinationPath += "post/";
      } else {
        destinationPath += "profile/";
      }
    } else if (ext === ".mp4" || ext === ".avi" || ext === ".mkv") {
      destinationPath += "video/";
    }
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
//
