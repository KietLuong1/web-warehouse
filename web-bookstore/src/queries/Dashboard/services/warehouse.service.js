const API_BASE_URL = 'http://localhost:8080/api/v1';
class WarehouseService {
    constructor() {
        Object.defineProperty(this, "baseURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        // Refresh token from localStorage on each request
        this.token = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { Authorization: `Bearer ${this.token}` }),
                ...options.headers
            },
            ...options
        };
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                // Specific error handling for different status codes
                if (response.status === 403) {
                    const errorMessage = `Access Forbidden (403): ${errorData.message || 'You do not have permission to access this resource'}`;
                    console.error('403 Forbidden Error:', {
                        url,
                        token: this.token ? 'Present' : 'Missing',
                        response: errorData
                    });
                    throw new Error(errorMessage);
                }
                if (response.status === 401) {
                    const errorMessage = `Unauthorized (401): ${errorData.message || 'Authentication required'}`;
                    console.error('401 Unauthorized Error:', {
                        url,
                        token: this.token ? 'Present' : 'Missing'
                    });
                    throw new Error(errorMessage);
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('API request failed:', {
                url,
                error: error instanceof Error ? error.message : error,
                token: this.token ? 'Present' : 'Missing'
            });
            throw error;
        }
    }
    buildQueryParams(params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        return searchParams.toString();
    }
    // Dashboard APIs
    async getDashboardSummary() {
        return this.request('/dashboard/summary');
    }
    async getDashboardSummaryByDateRange(startDate, endDate) {
        const params = this.buildQueryParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });
        return this.request(`/dashboard/summary/date-range?${params}`);
    }
    async getInventoryMetrics() {
        return this.request('/dashboard/inventory');
    }
    async getTransactionMetrics() {
        return this.request('/dashboard/transactions');
    }
    async getTransactionMetricsByDateRange(startDate, endDate) {
        const params = this.buildQueryParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });
        return this.request(`/dashboard/transactions/date-range?${params}`);
    }
    async getProductionMetrics() {
        return this.request('/dashboard/production');
    }
    async getRecentActivities(limit = 10) {
        return this.request(`/dashboard/recent-activities?limit=${limit}`);
    }
    async getTopProducts(limit = 5) {
        return this.request(`/dashboard/top-products?limit=${limit}`);
    }
    async getLowStockAlerts() {
        return this.request('/dashboard/low-stock-alerts');
    }
    async getTransactionTrends(period = 'DAILY') {
        return this.request(`/dashboard/transaction-trends?period=${period}`);
    }
    // Product APIs
    async getAllProducts() {
        return this.request('/products/all');
    }
    async getProductById(id) {
        return this.request(`/products/${id}`);
    }
    async searchProducts(searchTerm) {
        const params = this.buildQueryParams({ search: searchTerm });
        return this.request(`/products/search?${params}`);
    }
    async createProduct(formData) {
        return this.request('/products/add', {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }
    async updateProduct(formData) {
        return this.request('/products/update', {
            method: 'PUT',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }
    async deleteProduct(id) {
        return this.request(`/products/delete/${id}`, {
            method: 'DELETE'
        });
    }
    // Transaction APIs
    async getAllTransactions(params = {}) {
        const queryParams = this.buildQueryParams({
            page: params.page ?? 0,
            size: params.size ?? 1000,
            filter: params.filter
        });
        return this.request(`/transactions/all?${queryParams}`);
    }
    async getTransactionById(id) {
        return this.request(`/transactions/${id}`);
    }
    async createPurchase(transactionData) {
        return this.request('/transactions/purchase', {
            method: 'POST',
            body: JSON.stringify(transactionData)
        });
    }
    async createSale(transactionData) {
        return this.request('/transactions/sell', {
            method: 'POST',
            body: JSON.stringify(transactionData)
        });
    }
    async createReturn(transactionData) {
        return this.request('/transactions/return', {
            method: 'POST',
            body: JSON.stringify(transactionData)
        });
    }
    async updateTransactionStatus(transactionId, status) {
        return this.request(`/transactions/${transactionId}`, {
            method: 'PUT',
            body: JSON.stringify(status)
        });
    }
    async getAllCategories() {
        return this.request('/categories/all');
    }
    async getAllSuppliers() {
        return this.request('/suppliers/all');
    }
    async getAllWarehouses() {
        return this.request('/warehouses');
    }
    async getWarehouseInventory(id) {
        return this.request(`/warehouses/${id}/inventory`);
    }
}
export default new WarehouseService();
