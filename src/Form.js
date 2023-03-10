import { useFormik } from "formik";
import * as Yup from 'yup'

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Обов'язкове поле"
    } else if (values.name.length < 2) {
        errors.name = "Ім'я повинне бути не менше двух символів"
    }

    if (!values.email) {
        errors.email = "Обов'язкове поле"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Не вірно вказана email адреса'
    }

    return errors
}

const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validate,
        // validationSchema: Yup.object({
        //     name: Yup.string()
        //             .min(2, "Ім'я повинне бути не менше двух символів")
        //             .required("Обов'язкове поле"),
        //     email: Yup.string()
        //             .email('Не вірно вказана email адреса')
        //             .required("Обов'язкове поле"),
        //     amount: Yup.number()
        //             .required("Обов'язкове поле")
        //             .min(5, 'Не менше 5'),
        //     currency: Yup.string().required("Виберіть валюту"),
        //     text: Yup.string().min(10, 'Не менше 10 символів'),
        //     terms: Yup.boolean()
        //             .required("Надайте згоду")
        //             .oneOf([true], "Надайте згоду")


        // }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })
    
    return (
        <form className="form" onChange={formik.handleSubmit}>
            <h2>Відправити донат</h2>
            <label htmlFor="name">Ваше ім'я</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша пошта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
            <label htmlFor="amount">Кількість</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
             {/* {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null} */}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Виберіть валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
            </select>
            {/* {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null} */}
            <label htmlFor="text">Ваше повідомлення</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {/* {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null} */}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                Погоджуєтеся з політикою конфідеційності?
            </label>
            {/* {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null} */}
            <button type="submit">Відправити</button>
        </form>
    )
}

export default Form;






