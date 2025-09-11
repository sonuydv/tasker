import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
 title: { type: String, required: true,unique: true, trim: true },
 description: { type: String },
 status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  user:{type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
}, { timestamps: true });

// Virtual to clean up the output
TaskSchema.set('toJSON', {
  transform: (doc, ret:any) => {
    ret.id = ret._id.toString();
    delete ret.user;// expose id instead of _id
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  }
});

export const TaskModel
  = mongoose.model('Task', TaskSchema);
