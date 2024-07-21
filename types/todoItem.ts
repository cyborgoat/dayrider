export interface TodoItem {
    uuid: string;
    name: string;
    createdOn: string;
    finished: boolean;
    dueOn: string;
    notes?: string;
}
