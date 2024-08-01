export const isValid = (formik, field) => formik.touched[field] && !formik.errors[field]

export const isInValid = (formik, field) => formik.touched[field] && formik.errors[field]