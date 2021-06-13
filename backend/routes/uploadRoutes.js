import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileTYpe(file, cb) {
  const filetypes = /json/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb("json file only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTYpe(file, cb);
  },
});

router.post("/", upload.single("jsonFile"), (req, res) => {
//   res.send(`/${req.file.path}`);
console.log('====================================');
console.log(req.file);
console.log('====================================');
});
export default router;

