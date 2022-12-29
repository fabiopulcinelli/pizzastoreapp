export interface User {
    id?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    username?: string;
    password?: string;
    ruoli?: string[]
    token?: string;
}