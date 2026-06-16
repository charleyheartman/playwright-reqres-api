import { test as base } from '@playwright/test';
import { UsersApi } from './api/UsersApi';
import { UnknownApi } from './api/UnknownApi';


type Fixtures = {
    usersApi: UsersApi,
    unknownApi: UnknownApi,
};

export const test = base.extend<Fixtures>({
    usersApi: async ({ request }, use) => {
        await use(new UsersApi(request));
    },
    unknownApi: async ({ request }, use) => {
        await use(new UnknownApi(request));
    },
});

export { expect } from '@playwright/test';