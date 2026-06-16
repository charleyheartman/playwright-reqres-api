import { APIRequestContext, APIResponse } from '@playwright/test';

export class UnknownApi {
    constructor(private request: APIRequestContext) {}

    async getUnknownList(page: number): Promise<APIResponse> {
        return this.request.get(`/api/unknown?page=${page}`);
    }

     async getUnknownId(id: number): Promise<APIResponse> {
        return this.request.get(`/api/unknown/${id}`);
    }

}