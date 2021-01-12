import { FC } from 'react'
import Layout from '@/components/Layout'
import Button from '@/components/Button'
import Input from '@/components/Input'
import HeaderPage from '@/components/HeaderPage'
import { Formik, Form } from 'formik'
import CategorySchema from '@/validations/CategorySchema'

interface CategoryProps {
  category?: any | null
}

const Category: FC<CategoryProps> = ({ category }) => {
  const isCategory = typeof category !== 'undefined'

  return (
    <Layout>
      <Formik
        initialValues={{
          name: isCategory ? category.name : ''
        }}
        validationSchema={CategorySchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, errors }) => (

          <Form>
            <HeaderPage
              title={isCategory ? category.name : 'Nova Categoria'}
              rightContent={
                <Button
                  title="Publicar"
                  variant="primary"
                  type="submit"
                  disabled={!!(errors.name || !values.name)}
                />}
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
