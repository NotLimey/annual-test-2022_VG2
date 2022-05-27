import { TCompany } from "./Company";

export type UserType = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    company: TCompany;
}