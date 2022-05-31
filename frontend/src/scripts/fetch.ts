import axios from "axios";

export const fetchProjects = async () => await axios("/limeyfy/projects");

export const fetchCompanies = async () => await axios("/companies")

export const fetchRoles = async () => await axios("/role/roles")

export const fetchUsers = async () => await axios(`/users`);
export const fetchUsersWithParams = async (username?: string) => await axios(`/users${(username && username.length > 0) ? `?username=${username}` : ""}`)

export const fetchInvoices = async () => await axios("/invoices");

export const fetchStatisticsRevenue = async () => await axios("/statistics/revenue");
export const fetchStatisticsRevenueLastYear = async () => await axios("/statistics/revenue/last-year");

export const fetchExpenses = async () => await axios("/expenses");

export const fetchHours = async (id: string) => await axios(`/limeyfy/hours/${id}`);