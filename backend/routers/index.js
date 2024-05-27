import express from "express";
import { getUsers, Register, Login } from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createSchedule,
  getSchedule,
  deleteSchedule,
  updateSchedule,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/Appointment.js";
import {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getKategori,
  createKategori,
  deleteKategori,
  updateKategori,
  getMerk,
  createMerk,
  deleteMerk,
  updateMerk,
} from "../controllers/Product.js";

const router = express.Router();

router.get("/getProduct", getProduct);
router.get("/getKategori", getKategori);
router.get("/getMerk", getMerk);
router.post("/createProduct", createProduct);
router.post("/createKategori", createKategori);
router.post("/createMerk", createMerk);
router.delete("/deleteProduct", deleteProduct);
router.delete("/deleteKategori", deleteKategori);
router.delete("/deleteMerk", deleteMerk);
router.put("/updateProduct", updateProduct);
router.put("/updateKategori", updateKategori);
router.put("/updateMerk", updateMerk);
router.get("/getUsers", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/getAppointment", getAppointment);
router.post("/createAppointment", createAppointment);
router.delete("/deleteAppointment", deleteAppointment);
router.put("/updateAppointment", updateAppointment);
router.get("/getSchedule", getSchedule);
router.post("/createSchedule", createSchedule);
router.put("/updateSchedule", updateSchedule);
router.delete("/deleteSchedule", deleteSchedule);

export default router;
