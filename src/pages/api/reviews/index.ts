import { retrieveData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = await retrieveData("reviews");
    if (!data) {
      return res.status(404).json({ status: false, message: "Data not found", statusCode: 404 });
    }
    res.status(200).json({ status: true, message: "Success", ststusCode: 200, data });
  } else if (req.method === "POST") {
    // handling logic post
  }
}
