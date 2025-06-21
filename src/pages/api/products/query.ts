import { addData, retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = await retrieveData("products");
    res.status(200).json({ status: true, message: "Success", ststusCode: 200, data });
  } else if (req.method === "POST") {
    const token: any = req.headers.authorization?.split(" ")[1];
    const data = req.body;
    jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await addData("products", data, (status: boolean, id?: string) => {
          if (status) {
            res.status(200).json({ status: true, message: "Success", id });
          } else {
            res.status(400).json({ status: false, message: "Failed" });
          }
        });
      } else {
        res.status(403).json({ status: false, message: "You are not authorized" });
      }
    });
  }
}
