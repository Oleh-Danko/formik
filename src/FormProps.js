import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

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
                <label htmlFor="name">Ваше ім'я</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component="div"/>
                <label htmlFor="email">Ваша пошта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error" name="email" component="div"/>
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
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox" />
                    Погоджуєтеся з політикою конфідеційності?
                </label>
                <ErrorMessage className="error" name="terms" component="div"/>
                <button type="submit">Відправити</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;