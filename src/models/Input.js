// models/Input.js
import mongoose from 'mongoose';

const InputSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Input || mongoose.model('Input', InputSchema);
