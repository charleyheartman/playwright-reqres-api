import { validProduct } from '../../data/products.data';
import { test, expect } from '../../fixtures';



test.describe('Products API', () => {

    test('Создаем новый товар', async ({ productsApi }) => {
    const response = await productsApi.createProduct(
        validProduct
    );
    console.log(response.status())
    expect(response.status()).toBe(201);
    });

    test('Обновляем существующий товар', async ({ productsApi }) => {
        const productId = '12345';
        const response = await productsApi.updateProduct(productId, { name: 'Обновленное имя' });
        console.log(response.status())
        expect(response.status()).toBe(200);
    });

    test('Удаляем существующий товар', async ({ productsApi }) => {
        // 1. Создаём продукт
    const createResponse = await productsApi.createProduct(validProduct);
    expect(createResponse.status()).toBe(201);
    
    const created = await createResponse.json();
    const productId = created.data.id; // достаём id из ответа
    console.log('Создан продукт с id:', productId);
    
    // 2. Удаляем его
    const deleteResponse = await productsApi.deleteProduct(productId);
    console.log('Статус удаления:', deleteResponse.status());
    expect(deleteResponse.status()).toBe(204); // или 200 — проверим

    });

    test('Получаем список товаров', async ({ productsApi }) => {
        const response = await productsApi.getProductList();
        expect(response.status()).toBe(200);
    });

    test('Получаем товар по ID', async ({ productsApi }) => {
        const productId = '12345';
        const response = await productsApi.getProductById(productId);
        console.log(response.status() + " Получаем товар по ID")
        expect(response.status()).toBe(200);
    });

});