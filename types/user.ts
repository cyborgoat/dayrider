export interface User {
    name: string;
    id: string;
    icon?: string;
    birthday?: string;
}

export interface OnlineUser extends User {
    staff: boolean;
    superuser: boolean;
}
