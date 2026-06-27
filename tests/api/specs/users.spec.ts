import { test, expect } from '../../fixtures';


test.describe('GET /api/users', () => {

    test('должен вернуть список пользователей со статусом 200',async ({ usersApi }) => {
        const response = await usersApi.getUsers(1);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject({
            page: 1,
            per_page: 6,
            total: 12,
            total_pages: 2,
        });
        expect(body.data).toHaveLength(6);
    });

    test('список пользователей', async ({ usersApi }) => {
    const response = await usersApi.getUsers(1);
    expect(response.status()).toBe(200);
    });

    test('каждый пользователь должен иметь id, email, first_name, last_name', async ({ usersApi }) => {
        const response = await usersApi.getUsers(1);
        const body = await response.json()

        for (const user of body.data) {
            expect(user.id).toBeDefined();
            expect(user.email).toContain('@');
            expect(user.first_name).toBeDefined();
            expect(user.last_name).toBeDefined();
        }
    });

    test('должны проверить наличие данных у юзера с id 2', async ({ usersApi }) => {
        const response = await usersApi.getUserById(2);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.id).toBe(2);
        expect(body.data.email).toContain('janet.weaver@reqres.in');
    });

});

test.describe('GET /api/users/:id', () => {
    test('должны проверить наличие данных у юзера с id 2', async ({ usersApi }) => {
        const response = await usersApi.getUserById(2);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.id).toBe(2);
        expect(body.data.email).toContain('janet.weaver@reqres.in');
    });

    test('должен вернуть 404 для несуществующего пользователя', async ({ usersApi }) => {
        const response = await usersApi.getUserById(99999);
        expect(response.status()).toBe(404);

        const body = await response.json();
        expect(body).toEqual({});
    });
});

test.describe('POST /api/users', () => {
    test('должен создать пользователя со статусом 201', async ({ usersApi }) => {
        const response = await usersApi.createUser('morpheus', 'leader', 30);
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.name).toBe('morpheus');
        expect(body.job).toBe('leader');
        expect(body.age).toBe(30);  
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
    });
});


test.describe('DELETE /api/users/:id', () => {
    test('должен удалить пользователя со статусом 204', async ({ usersApi }) => {
        const response = await usersApi.deleteUser(30);
        expect(response.status()).toBe(204);
    });
});