
export interface TaskModel{
  id:string,
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}
