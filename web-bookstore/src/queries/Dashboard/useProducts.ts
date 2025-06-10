import { useState, useEffect, useCallback } from 'react'
import { Product } from './product.types'
import warehouseService from './services/warehouse.service'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  searchProducts: (searchTerm: string) => Promise<void>
  createProduct: (formData: FormData) => Promise<void>
  updateProduct: (formData: FormData) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await warehouseService.getAllProducts()
      setProducts(response.data.products || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const searchProducts = async (searchTerm: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await warehouseService.searchProducts(searchTerm)
      setProducts(response.data.products || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (formData: FormData): Promise<void> => {
    await warehouseService.createProduct(formData)
    await loadProducts() // Refresh the list
  }

  const updateProduct = async (formData: FormData): Promise<void> => {
    await warehouseService.updateProduct(formData)
    await loadProducts() // Refresh the list
  }

  const deleteProduct = async (productId: string): Promise<void> => {
    await warehouseService.deleteProduct(productId)
    await loadProducts()
  }

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
