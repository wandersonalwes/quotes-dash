import { CategoryData } from './category'

export interface QuoteData {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  userId: number
  published: false
  categories: CategoryData[]
}

export interface CreateQuoteData {
  content: string
  connectCategories: string[]
}

export interface UpdateQuoteData {
  content: string
  connectCategories: string[]
  disconnectCategories: string[]
}
