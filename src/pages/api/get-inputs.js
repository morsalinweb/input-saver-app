// pages/api/get-inputs.js
import dbConnect from "@/lib/mongodb";
import Input from "@/models/Input";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const inputs = await Input.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: inputs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
