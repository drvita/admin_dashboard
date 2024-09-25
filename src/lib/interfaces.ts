// src/lib/interfaces.ts

export interface Company {
    id: number;
    name: string;
    rfc: string;
}
export interface Address {
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    type: string;
}
export interface Phone {
    id: number;
    number: string;
    type: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string; // Podría ser Date si prefieres trabajar con objetos Date
    avatar: string;
    company: Company;
    main_address: Address;
    main_phone: Phone;
    roles: string[];
}
// Si necesitas una versión parcial de User (por ejemplo, para actualizaciones)
export type PartialUser = Partial<User>;
// Si necesitas una versión de User sin el campo 'id' (por ejemplo, para creación)
export type UserWithoutId = Omit<User, 'id'>;
// Si necesitas una versión de User con campos opcionales anidados
export interface UserWithOptionalFields extends Omit<User, 'company' | 'main_address' | 'main_phone'> {
    company?: Partial<Company>;
    main_address?: Partial<Address>;
    main_phone?: Partial<Phone>;
}