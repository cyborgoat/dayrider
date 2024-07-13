export interface Person {
  name: string;
  id: string;
  staff: boolean;
  superuser: boolean;
  icon?: string;
}

export interface User extends Person{
    birthday?: string
}