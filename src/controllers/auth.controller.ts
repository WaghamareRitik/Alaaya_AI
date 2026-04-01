import { Request, Response } from "express";
import { generateQR } from "../utils/qr";
import {
  createSessionService,
  getCurrentUserService,
  registerUserService,
} from "../services/auth.service";

export const generateQRController = async (req: Request, res: Response) => {
  try {
    const { screenId, storeId } = req.query;

    if (!screenId || !storeId) {
      return res.status(400).json({ message: "Missing screenId or storeId" });
    }

    const qrData = {
      screenId,
      storeId,
      timestamp: Date.now(),
    };

    const qr = await generateQR(qrData);

    res.json({ qr });
  } catch (error) {
    res.status(500).json({ message: "QR generation failed" });
  }
};

export const createSessionController = async (req: Request, res: Response) => {
  try {
    const session = await createSessionService(req.body);
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Session creation failed" });
  }
};

// ✅ Register user
export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// ✅ Get current user from session
export const getMeController = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId required" });
    }

    const data = await getCurrentUserService(sessionId as string);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
