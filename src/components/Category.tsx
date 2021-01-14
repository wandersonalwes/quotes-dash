import { FC } from 'react'
import Layout from '@/components/Layout'
import Button from '@/components/Button'
import Input from '@/components/Input'
import HeaderPage from '@/components/HeaderPage'
import { Formik, Form } from 'formik'
import CategorySchema from '@/validations/CategorySchema'
import { useRouter } from 'next/router'
import { CategoryData } from '@/domain/category'
import { categoryAPI } from '@/lib/api'

interface CategoryProps {
  category?: CategoryData
}

const Category: FC<CategoryProps> = ({ category }) => {
  const isCategory = typeof category !== 'undefined'

  const router = useRouter()

  const handleCategory = {
    create: async (name: string) => {
      await categoryAPI.create({ name })
      router.push('/categories')
    },
    update: async (id: number, name: string) => {
      await categoryAPI.update(id, { name })
      router.push('/categories')
    },
    delete: async (id: number) => {
      await categoryAPI.delete(id)
      router.push('/categories')
    }
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          name: isCategory ? category.name : ''
        }}
        validationSchema={CategorySchema}
        onSubmit={(values) => isCategory ? handleCategory.update(category.id, values.name) : handleCategory.create(values.name)}
      >
        {({ values, handleChange, errors }) => (

          <Form>
            <HeaderPage
              title={isCategory ? category.name : 'Nova Categoria'}
              rightContent={
                <>
                  {isCategory && (
                    <button
                      type="button"
                      className="text-lg uppercase text-pink-500 mr-4"
                      onClick={() => handleCategory.delete(category.id)}
                    >
                      Deletar
                    </button>
                  )}
                  <Button
                    title={isCategory ? 'Atualizar' : 'Publicar'}
                    variant="primary"
                    type="submit"
                    disabled={!!(errors.name || !values.name)}
                  />
                </>
              }
            />

            <div className="mt-8">
              <div className="col-span-3 md:col-span-2 bg-white shadow rounded py-4 px-6">
                <Input
                  name="content"
                  label="Nome"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder="Adicione uma frase aqui..."
                  errorMessage={errors.name && errors.name.toString()}
                  autoFocus
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Category
