import { test as base } from '@playwright/test';
import { UsersApi } from './api/clients/UsersApi';
import { UnknownApi } from './api/clients/UnknownApi';
import { ProductsApi } from './api/clients/ProductsApi';


type Fixtures = {
    usersApi: UsersApi,
    unknownApi: UnknownApi,
    productsApi: ProductsApi,
};

export const test = base.extend<Fixtures>({
    usersApi: async ({ request }, use) => {
        await use(new UsersApi(request));
    },
    unknownApi: async ({ request }, use) => {
        await use(new UnknownApi(request));
    },
    productsApi: async ({ request }, use) => {
        await use(new ProductsApi(request));
    },
});

export { expect } from '@playwright/test';