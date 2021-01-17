import { CategoryData, CreateAndUpdateCategory } from '@/domain/category'
import { CreateQuoteData, QuoteData, UpdateQuoteData } from '@/domain/quote'
import { paramString } from '@/utils/paramString '
import { API_URL } from './constants'

interface FetchOptions {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  body?: any
}

const fetchAPI = async (endpoint: string, options?: FetchOptions) => {
  const headers = { 'Content-Type': 'application/json' }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method,
    headers,
    body: JSON.stringify(options.body)
  })

  const json = await response.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json
}

type ParamID = string | string[]

export const categoryAPI = {
  findAll: async (): Promise<CategoryData[]> => {
    return await fetchAPI('/categories', { method: 'GET' })
  },

  findByID: async (id: ParamID): Promise<CategoryData> => {
    return await fetchAPI(`/categories/${paramString(id)}`, { method: 'GET' })
  },

  create: async (data: CreateAndUpdateCategory) => {
    return await fetchAPI('/categories', { method: 'POST', body: data })
  },

  update: async (id: number, data: CreateAndUpdateCategory) => {
    return await fetchAPI(`/categories/${id}`, { method: 'PUT', body: data })
  },

  delete: async (id: number) => {
    return await fetchAPI(`/categories/${id}`, { method: 'DELETE' })
  },

  count: async () => await fetchAPI('/categories/count', { method: 'GET' })
}

export const quoteAPI = {
  findAll: async (): Promise<QuoteData[]> => {
    return await fetchAPI('/quotes', { method: 'GET' })
  },

  findByID: async (id: ParamID): Promise<QuoteData> => {
    return await fetchAPI(`/quotes/${paramString(id)}`, { method: 'GET' })
  },

  create: async (data: CreateQuoteData) => {
    return await fetchAPI('/quotes', {
      method: 'POST',
      body: data
    })
  },

  update: async (id: number, data: UpdateQuoteData) => {
    return await fetchAPI(`/quotes/${id}`, {
      method: 'PUT',
      body: data
    })
  },

  delete: async (id: number) => {
    return await fetchAPI(`/quotes/${id}`, {
      method: 'DELETE'
    })
  },

  count: async () => await fetchAPI('/quotes/count', { method: 'GET' })
}
