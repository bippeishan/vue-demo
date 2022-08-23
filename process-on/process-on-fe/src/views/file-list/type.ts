export interface ShowParams {
  id?: string;
  parent_id?: string;
}

export interface FileInfo {
  id: string;
  parent_id: string;
  name: string;
  file_content: string;
}
