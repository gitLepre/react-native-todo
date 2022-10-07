export interface ITask {
  id: string;
  title: string;
  description?: string;
  important: boolean;
  completed: boolean;
}
