import { Request, Response } from "express";
import { registerUser, logInUser } from "../services/auth.service";
import { registerSchema, logInSchema } from "../utils/validation";

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

export const login = async (req: Request, res: Response) =>{
  try{
    const parsed = logInSchema.parse(req.body);

    const result = await logInUser(
      parsed.email,
      parsed.password
    )

    return res.status(200).json({
      success: 'true',
      message: "Login successful",
      result
    })

  }catch(error:any){
    res.status(400).json({
      message: error.message
    })
  }
}

export const logout = () =>{}
export const refresh = () =>{}
export const me = () =>{}