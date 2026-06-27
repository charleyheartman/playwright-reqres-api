// UsersApi.ts с типами
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersApi {
    constructor(private request: APIRequestContext) {}


    async getUsers(page: number): Promise<APIResponse> {
        return this.request.get(`/api/users?page=${page}`);
    }

    async getUserById(id: number): Promise<APIResponse> {
        return this.request.get(`/api/users/${id}`);
    }

    async createUser(name: string, job: string, age: number): Promise<APIResponse> {
        return this.request.post(`/api/users`, { data: {
            name,
            job,
            age
        } });
    }

    async deleteUser(id: number): Promise<APIResponse> {
        return this.request.delete(`/api/users/${id}`);
    }
}


