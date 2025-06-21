import { deleteData, retrieveDataById, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id }: any = req.query;
    const data = await retrieveDataById("products", id[0]);

    res.status(200).json({ status: true, message: "Success", ststusCode: 200, data });
  } else if (req.method === "PUT") {
    const token: any = req.headers.authorization?.split(" ")[1];
    const { id }: any = req.query;
    const data = req.body;

    jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await updateData("products", id[0], data, (status: boolean) => {
          if (status) {
            res.status(200).json({ status: true, message: "Success" });
          } else {
            res.status(400).json({ status: false, message: "Failed" });
          }
        });
      } else {
        res.status(400).json({ status: false, message: "Failed" });
      }
    });
  } else if (req.method === "DELETE") {
    const token: any = req.headers.authorization?.split(" ")[1];
    const { id }: any = req.query;

    jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await deleteData("products", id[0], (status: boolean) => {
          if (status) {
            res.status(200).json({ status: true, message: "Success" });
          } else {
            res.status(400).json({ status: false, message: "Failed" });
          }
        });
      } else {
        res.status(400).json({ status: false, message: "Failed" });
      }
    });
  }
}
