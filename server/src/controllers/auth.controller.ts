import { Request, Response } from "express";
import { registerUser, logInUser } from "../services/auth.service";
import { registerSchema, logInSchema } from "../utils/validation";
import { setRefreshCookie } from "../utils/cookies";
import { refreshAccessToken } from "../services/auth.service";
import { clearRefreshCookie } from "../utils/cookies";

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

    const { accessToken, refreshToken } = result;
    setRefreshCookie(res, refreshToken);

    return res.status(200).json({
      success: 'true',
      message: "Login successful",
      accessToken
    })


  }catch(error:any){
    res.status(400).json({
      message: error.message
    })
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const result = await refreshAccessToken(token);
    if (result.newRefreshToken) {
      setRefreshCookie(res, result.newRefreshToken);
    }

    res.json({ accessToken: result.accessToken });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  // if (token) {
  //   await logoutUser(token); //Write service for this
  // }
  clearRefreshCookie(res);

  res.json({ message: "Logged out" });
};
export const me = () =>{}