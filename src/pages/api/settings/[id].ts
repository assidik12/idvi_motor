import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = await retrieveData("web");

    if (!data) {
      return res.status(404).json({ status: false, message: "Data not found", statusCode: 404 });
    }
    res.status(200).json({ status: true, message: "Success", statusCode: 200, data });
  } else if (req.method === "PUT") {
    const data = req.body;
    const { id }: any = req.query;
    const token: any = req.headers.authorization?.split(" ")[1];

    jwt.verify(token, process.env.NEXTAUTH_SECREET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await updateData("web", id[0], data, (status: boolean) => {
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
