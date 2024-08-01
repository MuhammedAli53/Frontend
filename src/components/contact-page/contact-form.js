import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { FiMail, FiMessageSquare, FiSend, FiTag, FiUser } from "react-icons/fi";
import "./contact-form.scss"
import * as Yup from "yup";
import { useFormik } from 'formik';
import { isInValid, isValid } from '../../helpers/functions/forms';
import { createMessage } from '../../api/contact-message-services';
import { swalAlert } from '../../helpers/functions/swal';
import ButtonLoader from '../common/button-loader';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    const initialValues ={
        email: "",
        message: "",
        name: "",
        subject: ""
    }

    const validationSchema = Yup.object({/* validasyon şemamız. Burda kontrollerimizi yapabiliyoruz Yup üzerinden. */
        email: Yup.string().email("Invalid email").max(50, "Max 50 characters").required("Required"),/* required, eğer boş geçilirse hata çıkarır.ç */
        message: Yup.string().required("Required").max(200, "Max 200 characters"),
        name: Yup.string().required("Required").min(4, "At least 4 characters").max(30, "Max 30 characters"),
        subject: Yup.string().required("Required").min(4, "At least 4 characters").max(30, "Max 30 characters")
    })

    const onSubmit = async (values) => {
        setLoading(true);

        try {
            await createMessage(values);
            formik.resetForm();

            swalAlert("Your message was sent", "success");


        } catch (err) {
            const errMsg = Object.values(err.response.data.validations)[0];
            swalAlert(errMsg, "error");
        }
        finally{
            setLoading(false);
        }
    }

    const formik = useFormik({/* içerdeki değerler yukarda setlendi. */
        initialValues,
        validationSchema,
        onSubmit
    })



  return (
    <Form className="contact-form" noValidate onSubmit={formik.handleSubmit}>{/* normalde form içinde action attrübute var, oraya backend url yazıp göndeririz ama bizim bağlantı api.
    bu şekilde gönderme imkanı yok, bu nedenle ilk olarak bizim kontrolden geçöirmemiz lazım. noValidate attribute koyuyoruz, bunun nedeni formun sahip olduğu valid işlemini iptal etmek.
    formik ve yup yapımız var. */}
        <h2>Send me message</h2>
        <Row className="g-3">
            <Col md={6}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FiUser/></InputGroup.Text>
                    <Form.Control
                        placeholder="Your name"
                        aria-label="Your name"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("name")}
                        isValid={isValid(formik, "name")}
                        isInvalid={isInValid(formik, "name")}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FiMail/></InputGroup.Text>
                    <Form.Control
                        type="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("email")}
                        isValid={isValid(formik, "email")}
                        isInvalid={isInValid(formik, "email")}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>

            <Col xs={12}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FiTag/></InputGroup.Text>
                    <Form.Control
                        placeholder="Subject"
                        aria-label="Subject"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("subject")}
                        isValid={isValid(formik, "subject")}
                        isInvalid={isInValid(formik, "subject")}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.subject}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>

            <Col xs={12}>
                <InputGroup className="mb-3">
                    <InputGroup.Text><FiMessageSquare/></InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea" 
                    {...formik.getFieldProps("message")}
                    isValid={isValid(formik, "message")}
                    isInvalid={isInValid(formik, "message")}
                />
                <Form.Control.Feedback type="invalid">
                        {formik.errors.message}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>

        </Row>

        <Button type="submit" variant="primary" disabled={!(formik.dirty && formik.isValid) || loading}>
            {loading ? <ButtonLoader/>  : <FiSend/>} Send
        </Button>

      
    </Form>
  )
}

export default ContactForm