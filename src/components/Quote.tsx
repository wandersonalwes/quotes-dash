import { FC, Fragment, useState } from 'react'
import { Layout, Button, Checkbox, Textarea, HeaderPage } from '.'
import { Formik, Form, Field } from 'formik'
import QuoteSchema from '@/validations/QuoteSchema'
import { BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { quoteAPI } from '@/lib/api'
import { CreateQuoteData, QuoteData } from '@/domain/quote'
import { CategoryData } from '@/domain/category'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/client'

interface QuoteProps {
  quote?: QuoteData
  categories: CategoryData[]
}

interface UpdateQuoteData {
  content: string
  selectedCategories: string[]
  published: boolean
}

const Quote: FC<QuoteProps> = ({ quote, categories }) => {
  const [session] = useSession()
  const isQuote = typeof quote !== 'undefined'
  const router = useRouter()
  const currentCategoryNames = quote?.categories.map(({ name }) => name)
  const [searchCategories, setSearchCategories] = useState('')
  const filteredCategories = categories.filter(({ name }) => name.indexOf(searchCategories) > -1)

  const handleQuote = {
    create: async (data: CreateQuoteData) => {
      try {
        const response = await quoteAPI.create(data)

        if (response.error) {
          return toast.error(response.error)
        }

        toast.success('Frase adicionada com sucesso')
        router.push('/quotes')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
    },
    update: async (id: number, data: UpdateQuoteData & {selectedCategories: string[]}) => {
      try {
        const { content, selectedCategories, published } = data

        const connectCategories = selectedCategories.filter(selectedCategoryName => {
          return !currentCategoryNames.some((currentCategoryName: string) => currentCategoryName === selectedCategoryName)
        })

        const disconnectCategories = currentCategoryNames.filter((categoryName: string) => {
          return !selectedCategories.some(selectedCategory => selectedCategory === categoryName)
        })

        const response = await quoteAPI.update(id, {
          content,
          connectCategories,
          disconnectCategories,
          published
        })

        if (response.error) {
          return toast.error(response.error)
        }

        toast.success('Frase atualizada com sucesso')
        router.push('/quotes')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
    },
    delete: async (id: number) => {
      try {
        const response = await quoteAPI.delete(id)

        if (response.error) {
          return toast.error(response.error)
        }

        toast.success('Frase excluída com sucesso')
        router.push('/quotes')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
    }
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          content: isQuote ? quote.content : '',
          selectedCategories: isQuote ? currentCategoryNames : [],
          published: isQuote ? quote.published : true
        }}
        validationSchema={QuoteSchema}
        onSubmit={({ content, selectedCategories, published }) => isQuote
          ? handleQuote.update(quote.id, { content, selectedCategories, published })
          : handleQuote.create({ content, connectCategories: selectedCategories, published })}
      >
        {({ values, handleChange, errors, setFieldValue }) => (

          <Form>
            <HeaderPage
              title={isQuote ? String(quote.id) : 'Nova Frase'}
              rightContent={
                <Fragment>
                  {isQuote && (
                    <button
                      type="button"
                      className="text-lg uppercase text-pink-500 mr-4"
                      onClick={() => handleQuote.delete(quote.id)}
                    >
                      Deletar
                    </button>
                  )}
                  <Button
                    title={isQuote ? 'Atualizar' : 'Publicar'}
                    variant="primary"
                    type="submit"
                    disabled={!!(errors.content || errors.selectedCategories || !values.content)}
                  />
                </Fragment>
              }
            />

            <div className="grid grid-cols-3 mt-8 gap-4">
              <div className="col-span-3 md:col-span-2 bg-white shadow rounded py-4 px-6">
                <Textarea
                  autoFocus
                  name="content"
                  label="Conteúdo"
                  value={values.content}
                  onChange={handleChange('content')}
                  placeholder="Adicione uma frase aqui..."
                  rows={5}
                  errorMessage={errors.content && errors.content.toString()}
                />
              </div>
              <div className="col-span-3 md:col-span-1">
                <div className="bg-white shadow rounded-md py-4 px-6">

                  {session.user.isAdmin && (
                    <>
                      <h2 className="text-sm font-medium text-gray-700  mb-2">Status</h2>
                      <ul className="border-b mb-4 pb-4">
                        <li>
                          <label htmlFor="true">
                            <input
                              type="radio"
                              name="status"
                              id="true"
                              checked={values.published}
                              onChange={() => setFieldValue('published', true)}
                            />

                            <span className="text-sm text-gray-800 ml-2">Publicado</span>
                          </label>
                        </li>
                        <li>
                          <label htmlFor="false">
                            <input
                              type="radio"
                              name="status"
                              id="false"
                              checked={!values.published}
                              onChange={() => setFieldValue('published', false)}
                            />
                            <span className="text-sm text-gray-800 ml-2">Rascunho</span>
                          </label>
                        </li>
                      </ul>
                    </>
                  )}

                  <div className="relative">
                    <label htmlFor="categories" className="text-sm font-medium text-gray-700">Categorias</label>

                    <div className="relative">
                      <input
                        value={searchCategories}
                        onChange={(e) => setSearchCategories(e.target.value)}
                        id="categories"
                        type="text"
                        placeholder="Buscar categorias"
                        className="dropdown-input px-4 py-2 w-full border rounded text-md mt-1 rounded-b-none outline-none bg-gray-100"
                      />

                      {searchCategories && (
                        <button
                          className="absolute top-4 right-3"
                          onClick={() => setSearchCategories('')}
                        >
                          <BsX className="h-6 w-6" />
                        </button>
                      )}
                    </div>

                    {!!filteredCategories.length && (
                      <div className="dropdown-content z-50 mt-1 w-full rounded bg-white border overflow-x-hidden max-h-56">
                        <ul className="block">

                          {filteredCategories.map((category) => (
                            <li key={category.name} className="flex border-b last:border-b-0">
                              <label className="flex items-center px-4 py-2 w-full h-full cursor-pointer" htmlFor={category.name}>

                                <Field
                                  id={category.name}
                                  name="selectedCategories"
                                  value={category.name}
                                  component={Checkbox}
                                  onChange={handleChange('selectedCategories')}
                                  checked={values.selectedCategories.includes(category.name)}
                                />
                                <p className="text-sm text-gray-800 ml-2">{category.name}</p>
                              </label>
                            </li>
                          ))}

                        </ul>
                      </div>
                    )}

                    {!filteredCategories.length && (
                      <p className="mt-1 text-red-500 text-xs">Categoria não encontrada.</p>
                    )}

                  </div>

                  <p className="text-xs text-red-500 mt-1">{errors.selectedCategories && errors.selectedCategories}</p>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Quote
