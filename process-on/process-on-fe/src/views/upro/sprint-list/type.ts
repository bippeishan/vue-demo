export interface SprintInfo {
  id: number;
  name: string;
  state: 'TODO' | 'DOING' | 'DONE';
  start_time: number;
  end_time: number;
}
