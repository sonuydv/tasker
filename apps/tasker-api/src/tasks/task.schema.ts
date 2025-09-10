import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String },
 status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  user:{type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
}, { timestamps: true });


export const TaskModel
  = mongoose.model('Task', TaskSchema);
