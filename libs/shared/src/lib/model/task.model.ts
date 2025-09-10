
export interface TaskModel{
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}
