export interface User {
    name: string;
    id: string;
    email: string;
    icon?: string;
    birthday?: string;
}

export interface OnlineUser extends User {
    staff: boolean;
    superuser: boolean;
}
