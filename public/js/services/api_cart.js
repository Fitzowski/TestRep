const API_BASE = '/api';
async function request(url, options) {
    const res = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}
export const apiCart = {
    // Получить корзину
    getCart: () => request('/cart'),
    // Получить количество товаров
    getCartCount: () => request('/cart/count'),
    // Добавить товар в корзину
    addToCart: (productId, quantity = 1) => request('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    }),
    // Изменить количество товара
    updateQuantity: (productId, quantity) => request('/cart', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
    }),
    // Удалить товар из корзины
    removeFromCart: (productId) => request(`/cart/${productId}`, {
        method: 'DELETE',
    }),
    // Очистить корзину
    clearCart: () => request('/cart', {
        method: 'DELETE',
    }),
};
