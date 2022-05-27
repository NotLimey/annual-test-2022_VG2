import axios from "axios";

export const fetchProjects = async () => await axios("/limeyfy/projects");

export const fetchCompanies = async () => await axios("/companies")

export const fetchRoles = async () => await axios("/role/roles")

export const fetchUsers = async () => await axios(`/user/users`);
export const fetchUsersWithParams = async (username?: string) => await axios(`/user/users${(username && username.length > 0) ? `?username=${username}` : ""}`)

export const fetchUsersRoles = async () => await axios("/user/get-user-roles")

export const fetchInvoices = async () => await axios("/limeyfy/invoices");