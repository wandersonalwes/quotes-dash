import { FC } from 'react'
import { Layout, Button, Input, HeaderPage } from '.'
import { Formik, Form } from 'formik'
import CategorySchema from '@/validations/CategorySchema'
import { useRouter } from 'next/router'
import { CategoryData } from '@/domain/category'
import { categoryAPI } from '@/lib/api'
import { toast } from 'react-toastify'

interface CategoryProps {
  category?: CategoryData
}

const Category: FC<CategoryProps> = ({ category }) => {
  const isCategory = typeof category !== 'undefined'

  const router = useRouter()

  const handleCategory = {
    create: async (name: string) => {
      try {
        const response = await categoryAPI.create({ name })

        if (response.error) {
          return toast.error(response.error)
        }

        toast.success('Categoria adicionada com sucesso')
        router.push('/categories')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
    },
    update: async (id: number, name: string) => {
      try {
        const response = await categoryAPI.update(id, { name })

        if (response.error) {
          return toast.error(response.error)
        }

        toast.success('Categoria atualizada com sucesso')
        router.push('/categories')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
    },
    delete: async (id: number) => {
      try {
        await categoryAPI.delete(id)

        toast.success('Categoria excluída com sucesso')
        router.push('/categories')
      } catch (error) {
        toast.error('Error interno do servidor')
      }
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
