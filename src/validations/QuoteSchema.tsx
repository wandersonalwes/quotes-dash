import * as Yup from 'yup'

const QuoteSchema = Yup.object().shape({
  content: Yup.string()
    .min(10, 'Este campo deve ter pelo menos 10 caracteres')
    .required('Campo obrigatório'),
  selectedCategories: Yup.array().min(1, 'Você deve selecionar pelo menos 1 categoria')
})

export default QuoteSchema
