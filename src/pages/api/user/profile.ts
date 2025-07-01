import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
        if (decoded) {
          const user: any = await retrieveDataById("users", decoded.id);
          user.id = decoded.id;

          return res.status(200).json({ status: true, message: "Success", data: user });
        } else {
          return res.status(401).json({ status: false, message: "Unauthorized" });
        }
      });
    }
  } else if (req.method === "PUT") {
    const data = req.body;
    const token: any = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
        if (decoded) {
          if (data.oldPassword) {
            const passwordMatch = await compare(data.oldPassword, data.encryptedPassword);
            if (!passwordMatch) {
              return res.status(401).json({ status: false, message: "Failed change password" });
            }
            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await hash(data.password, 10);
          }
          await updateData("users", decoded.id, data, (status: boolean) => {
            if (status) {
              res.status(200).json({ status: true, message: "Success" });
            } else {
              res.status(401).json({ status: false, message: "Failed" });
            }
          });
        } else {
          res.status(400).json({ status: false, message: "Failed" });
        }
      });
    }
  }
}
