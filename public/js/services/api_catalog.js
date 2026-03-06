const API_BASE = '/api';
async function request(url, options) {
    const res = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}
export const apiCatalog = {
    // Получить все товары
    getProducts: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search)
            queryParams.append('search', params.search);
        if (params?.nation)
            queryParams.append('nation', params.nation);
        if (params?.type)
            queryParams.append('type', params.type);
        if (params?.level)
            queryParams.append('level', params.level.toString());
        if (params?.inStock !== undefined)
            queryParams.append('inStock', params.inStock.toString());
        if (params?.sortBy)
            queryParams.append('sortBy', params.sortBy);
        const queryString = queryParams.toString();
        return request(`/catalog${queryString ? `?${queryString}` : ''}`);
    },
    // Получить товар по ID
    getProduct: (id) => request(`/catalog/${id}`),
    // Получить доступные фильтры
    getFilters: () => request('/catalog/filters'),
    // Поиск товаров
    searchProducts: (query) => request(`/catalog/search?q=${encodeURIComponent(query)}`),
};
