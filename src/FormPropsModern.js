import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup'

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <>
            <label className='checkbox' >
                <input type="checkbox" {...props} {...field} />
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {
    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, "Ім'я повинне бути не менше двух символів")
                        .required("Обов'язкове поле"),
                email: Yup.string()
                        .email('Не вірно вказана email адреса')
                        .required("Обов'язкове поле"),
                amount: Yup.number()
                        .required("Обов'язкове поле")
                        .min(5, 'Не менше 5'),
                currency: Yup.string().required("Виберіть валюту"),
                text: Yup.string().min(10, 'Не менше 10 символів'),
                terms: Yup.boolean()
                        .required("Надайте згоду")
                        .oneOf([true], "Надайте згоду")
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>

            <Form className="form">
                <h2>Відправити донат</h2>
                <MyTextInput
                    label="Ваше ім'я"
                    id="name"
                    name="name"
                    type="text" />
                <MyTextInput 
                    label="Ваша пошта"
                    id="email"
                    name="email"
                    type="email" />
                <label htmlFor="amount">Кількість</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Виберіть валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="EUR">EUR</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                <label htmlFor="text">Ваше повідомлення</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>
                <MyCheckbox name="terms">
                    Погоджуєтеся з політикою конфідеційності?
                </MyCheckbox>
                <button type="submit">Відправити</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;