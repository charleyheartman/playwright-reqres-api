import { test, expect } from '../../fixtures';

test.describe('GET /api/unknown', () => {

    test('должен вернуть список неизвестных объектов со статусом 200',async ({ unknownApi }) => {
        const response = await unknownApi.getUnknownList(1);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toMatchObject({
            page: 1,
            per_page: 6,
            total: 12,
            total_pages: 2,
        });
    });
})