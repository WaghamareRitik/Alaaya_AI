import express from "express";
import {
  generateQRController,
  createSessionController,
  registerController,
  getMeController,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/qr/generate", generateQRController);
router.post("/auth/session", createSessionController);
router.post("/auth/register", registerController);
router.get("/auth/me", getMeController);

export default router;
