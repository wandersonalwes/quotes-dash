import { CategoryData } from './category'

export interface QuoteData {
  id: number
  content: string
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
