import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from '../common/password-input';
import { isInValid, isValid } from '../../helpers/functions/forms';
import { login } from '../../api/auth-service';
import { swalAlert } from '../../helpers/functions/swal';
import { setToLocalStorage } from '../../helpers/functions/encrypted-storage';
import { useDispatch } from 'react-redux';
import { login as loginSuccess } from '../../store/slices/auth-slice';
import {AiFillLock} from "react-icons/ai"
import ButtonLoader from '../common/button-loader';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const initialValues ={
        password: "123456Aa.",
        username: "root"
    }

    const validationSchema = Yup.object({
        password: Yup.string().required("Required"),
        username: Yup.string().required("Required")
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const resp = await login(values);
            const { token } = resp;
            setToLocalStorage("token", token);
            dispatch(loginSuccess(resp));
            navigate("/dashboard");
        } catch (err) {
            console.log(err)
            const errMsg = err.response.data.message;
            swalAlert(errMsg, "error");
        }
        finally{
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
   
  return (
    <Container>
        <Row className="justify-content-center">
            <Col md={8} lg={6}>
                <Card className="border-0 border-top border-5 border-primary shadow">
                    <Card.Body>
                        <div className="mb-3 mt-3 text-muted"><em>Please enter your username and password</em></div>

                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="userName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" 
                                    {...formik.getFieldProps("username")}
                                    isInvalid={isInValid(formik, "username")}
                                    isValid={isValid(formik, "username")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <PasswordInput 
                                    {...formik.getFieldProps("password")}
                                    isInvalid={isInValid(formik, "password")}
                                    isValid={isValid(formik, "password")}
                                    error={formik.errors.password}
                                />
                                
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={!(formik.isValid) || loading}>
                                {loading ? <ButtonLoader/>  : <AiFillLock/>} Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default LoginForm