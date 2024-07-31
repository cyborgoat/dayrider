export interface TodoItem {
  uuid: string;
  name: string;
  date: string;
  finished: string;
  deadline: string;
  notes?: string;
}

export type onItemRemoveFunction = (uuid: string) => void;
export type onItemUpdateFunction = (idx: number, item: TodoItem) => void;
