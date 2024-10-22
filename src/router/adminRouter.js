const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const { varifyToken } = require("../helper/varifyTokenFn");
const multer = require("multer");
const path = require("path");
const verifyRoles = require("../../middlewares/verifyRoles");
const roleList = require("../../src/consts/autho");
const getMulterStorage = require("../helper/fileUpload");
// const uploadSingle = getMulterStorage("groupImage").single("groupImage"); 
adminRouter.post("/login", adminController.login);
adminRouter.get("/userList", varifyToken, adminController.userList);
adminRouter.post("/changPassword", adminController.changPassword);
adminRouter.post("/SendOtp", adminController.forgotPasswordSendOtp);
adminRouter.post("/varifyOtp", adminController.varifyOtp);
adminRouter.delete("/deleteUser", varifyToken, adminController.deleteUser);
adminRouter.get(
  "/adminProfile",
  varifyToken,
  verifyRoles(roleList.ADMIN),
  adminController.adminProfile
);
module.exports = adminRouter;
