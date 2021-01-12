import * as Yup from 'yup'

const QuoteSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Este campo deve ter pelo menos 2 caracteres')
    .required('Campo obrigatório')
})

export default QuoteSchema
