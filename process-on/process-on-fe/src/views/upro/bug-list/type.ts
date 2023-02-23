export interface BugInfo {
  id: number;
  name: string;
  priority: number;
  state: 'TODO' | 'DOING' | 'DONE';
  creator: number;
  assign: number;
}
