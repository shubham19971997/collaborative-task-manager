import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { registerSchema } from "../utils/validation";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.parse(req.body);

    const result = await registerUser(
      parsed.email,
      parsed.name,
      parsed.password
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};