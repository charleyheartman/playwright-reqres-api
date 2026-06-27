import { APIRequestContext, APIResponse } from '@playwright/test';
import { ProductData } from '../../data/products.data';

const PROJECT_ID = 28678;
const BASE_PATH = `/api/collections/products/records?project_id=${PROJECT_ID}`;



export class ProductsApi {
    constructor(private request: APIRequestContext) {}

    async createProduct(data: ProductData): Promise<APIResponse> {
    return this.request.post(BASE_PATH, {
        headers: { 'X-Reqres-Env': 'prod' },
        data: { data }
    });
}

    async getProductById(id: string): Promise<APIResponse> {
    return this.request.get(
        `${BASE_PATH}/${id}`,
        { headers: { 'X-Reqres-Env': 'prod' } }
    );
}

     async getProductList(): Promise<APIResponse> {
        return this.request.get(`${BASE_PATH}`, { headers: { 'X-Reqres-Env': 'prod' } });
    }

     async updateProduct(id: string, data: Partial<ProductData>): Promise<APIResponse> {
        return this.request.put(`${BASE_PATH}/${id}`, { 
            headers: { 'X-Reqres-Env': 'prod' },
            data: { data }
        });
    }

     async deleteProduct(id: string): Promise<APIResponse> {
        return this.request.delete(`${BASE_PATH}/${id}`);
    }
} 