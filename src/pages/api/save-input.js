// pages/api/save-input.js
import dbConnect from "@/lib/mongodb";
import Input from "@/models/Input";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: "Value is required" });

    try {
      await dbConnect();
      const newInput = new Input({ value });
      await newInput.save();
      res.status(201).json({ success: true, data: newInput });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
