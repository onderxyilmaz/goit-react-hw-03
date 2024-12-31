import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Sadece harfler kullanılabilir')
        .min(3, 'Minimum 3 karakter olmalıdır')
        .max(50, 'Maksimum 50 karakter olmalıdır')
        .required('İsim zorunludur'),
    number: Yup.string()
        .matches(/^\d+$/, 'Sadece sayılar kullanılabilir')
        .min(3, 'Minimum 3 karakter olmalıdır')
        .max(50, 'Maksimum 50 karakter olmalıdır')
        .required('Numara zorunludur'),
});

export const ContactForm = ({ onSubmit, nameInputRef }) => {
    const handleSubmit = (values, { resetForm }) => {
        onSubmit({
            id: nanoid(),
            ...values,
        });
        resetForm();
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, submitForm, values, isValid }) => (
                <Form className={css.form} onKeyDown={(e) => {
                    if (e.key === 'Enter' && values.name && values.number && isValid) {
                        e.preventDefault();
                        submitForm();
                    }
                }}>
                    <div className={css.field}>
                        <label htmlFor="name" onClick={() => nameInputRef.current?.focus()}>
                            Name
                        </label>
                        <Field
                            type="text"
                            name="name"
                            innerRef={nameInputRef}
                            pattern="[A-Za-z\s]+"
                            onKeyPress={(e) => {
                                if (!/[a-zA-Z\s]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <ErrorMessage name="name" component="div" className={css.error} />
                    </div>

                    <div className={css.field}>
                        <label htmlFor="number" onClick={() => document.getElementById('number').focus()}>
                            Number
                        </label>
                        <Field
                            type="text"
                            name="number"
                            id="number"
                            pattern="\d+"
                            onKeyPress={(e) => {
                                if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <ErrorMessage name="number" component="div" className={css.error} />
                    </div>

                    <button type="submit">Add contact</button>
                </Form>
            )}
        </Formik>
    );
}; 