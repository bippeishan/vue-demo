export interface TaskInfo {
  id: number;
  name: string;
  description: string;
  type: 'TODO' | 'DOING' | 'DONE';
  assign: number;
  start_time: number;
  end_time: number;
  create_time: number;
}
