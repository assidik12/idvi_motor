import { SignUp } from "@/services/auth/method";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.email !== "" || req.body.password !== "") {
      await SignUp(req.body, (status: boolean) => {
        if (status) {
          res.status(200).json({ status: true, message: "Success" });
        } else {
          res.status(400).json({ status: false, message: "Email already exists" });
        }
      });
    } else {
      return res.status(400).json({ status: false, message: "Email and password are required" });
    }
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
