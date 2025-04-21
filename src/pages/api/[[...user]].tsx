import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const user = await retrieveData("users");
    const data = user.map((user: any) => {
      delete user.password;
      return user;
    });

    res.status(200).json({ status: true, message: "Success", ststusCode: 200, data });
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    await updateData("users", id, data, (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, message: "Success" });
      } else {
        res.status(400).json({ status: false, message: "Failed" });
      }
    });
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    await deleteData("users", user[1], (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, message: "Success" });
      } else {
        res.status(400).json({ status: false, message: "Failed" });
      }
    });
  }
}
