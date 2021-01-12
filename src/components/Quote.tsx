import { FC, useState } from 'react'
import Layout from '@/components/Layout'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Textarea from '@/components/Textarea'
import HeaderPage from '@/components/HeaderPage'
import { Formik, Form, Field } from 'formik'
import QuoteSchema from '@/validations/QuoteSchema'
import { BsX } from 'react-icons/bs'

interface QuoteProps {
  quote?: any | null
}

const Quote: FC<QuoteProps> = ({ quote }) => {
  const isQuote = typeof quote !== 'undefined'

  const [searchCategories, setSearchCategories] = useState('')

  const categories = ['categoria1', 'categoria2', 'categoria3']

  const filteredCategories = categories.filter(category => category.indexOf(searchCategories) > -1)
  return (
    <Layout>
      <Formik
        initialValues={{
          content: isQuote ? quote.content : '',
          categories: []
        }}
        validationSchema={QuoteSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, errors }) => (

          <Form>
            <HeaderPage
              title={isQuote ? quote.id : 'Nova Frase'}
              rightContent={
                <Button
                  title="Publicar"
                  variant="primary"
                  type="submit"
                  disabled={!!(errors.content || errors.categories || !values.content)}
                />}
            />

            <div className="grid grid-cols-3 mt-8 gap-4">
              <div className="col-span-3 md:col-span-2 bg-white shadow rounded py-4 px-6">
                <Textarea
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

                          {filteredCategories.map(category => (
                            <li key={category} className="flex border-b last:border-b-0">
                              <label className="flex items-center px-4 py-2 w-full h-full cursor-pointer" htmlFor={category}>

                                <Field
                                  id={category}
                                  name="categories"
                                  value={category}
                                  component={Checkbox}
                                  onChange={handleChange('categories')}
                                  checked={values.categories.includes(category)}
                                />

                                <p className="text-sm text-gray-800 ml-2">{category}</p>
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

                  <p className="text-xs text-red-500 mt-1">{errors.categories && errors.categories}</p>
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
