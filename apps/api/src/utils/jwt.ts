// import jwt from "jsonwebtoken";
// import { env } from "@/config/env";

// type JwtPayload = {
//   userId: string;
// };

// export const generateToken = (payload: JwtPayload) => {
//   return jwt.sign(payload, env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// export const verifyToken = (token: string) => {
//   return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
// };



import jwt from "jsonwebtoken";
import { env } from "@/config/env";

type JwtPayload = {
  userId: string;
};

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};