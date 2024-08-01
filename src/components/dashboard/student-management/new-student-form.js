import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { isInValid, isValid } from "../../../helpers/functions/forms";
import { useDispatch } from "react-redux";
import {
  setOperation,
  setlistRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/functions/swal";
import ButtonLoader from "../../common/button-loader";
import { createStudent } from "../../../api/student-service";
import { getAllAdvisorTeachers } from "../../../api/advisor-teacher-service";
const NewStudentForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [advisorTeachers, setAdvisorTeachers] = useState([])
  const initialValues = {
    birthDay: "",
    birthPlace: "",
    gender: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
    advisorTeacherId: "",
    fatherName: "",
    motherName: "",
    email:"",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    gender: Yup.string()
      .required("Required")
      .oneOf(
        ["MALE", "FEMALE"],
        "Invalid Gender"
      ) /* male veya female olabilir. Eeğr bu ikisi gelmezse invalid gender mesajı. */,
    birthDay: Yup.date().required("Required"),
    birthPlace: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(
        /\d{3}-\d{3}-\d{4}/g,
        "Invalid Phone number"
      ) /* matches regex tanımlamadır. */,
    ssn: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{2}-\d{4}/g, "Invalid ssn"),
    username: Yup.string().required("Required"),
    motherName: Yup.string().required("Required"),
    fatherName: Yup.string().required("Required"),
    advisorTeacherId: Yup.number().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "At least 8 characters")
      .matches(/[a-z]+/g, "One lowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), "Password must match"]),
    email: Yup.string().email("Invalid Email").required("Required")
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createStudent(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setlistRefreshToken(Math.random()));
      swalAlert("Student was created successfully", "success");
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    formik.resetForm();
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true
  });
  const loadAdvisorTeacher = async () => {
    try {
      const data = await getAllAdvisorTeachers();
      
      setAdvisorTeachers(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    loadAdvisorTeacher();
    // eslint-disable-next-line
  },[])
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isValid={isValid(formik, "name")}
                    isInvalid={isInValid(formik, "name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isValid={isValid(formik, "surname")}
                    isInvalid={isInValid(formik, "surname")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="floatingSelect" label="Gender">
                  <Form.Select
                    aria-label="Select gender"
                    {...formik.getFieldProps("gender")}
                    isValid={isValid(formik, "gender")}
                    isInvalid={isInValid(formik, "gender")}
                  >
                    <option>Select Gender</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="MALE">MALE</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="birthdate"
                  label="Birthdate"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isValid={isValid(formik, "birthDay")}
                    isInvalid={isInValid(formik, "birthDay")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="placeofbirth"
                  label="Place of birth"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isValid={isValid(formik, "birthPlace")}
                    isInvalid={isInValid(formik, "birthPlace")}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="phone" label="XXX-XXX-XXXX" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="XXX-XXX-XXXX"
                    {...formik.getFieldProps("phoneNumber")}
                    isValid={isValid(formik, "phoneNumber")}
                    isInvalid={isInValid(formik, "phoneNumber")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="Email"
                    placeholder=""
                    {...formik.getFieldProps("email")}
                    isValid={isValid(formik, "email")}
                    isInvalid={isInValid(formik, "email")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="ssn" label="XXX-XX-XXXX" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="XXX-XX-XXXX"
                    {...formik.getFieldProps("ssn")}
                    isValid={isValid(formik, "ssn")}
                    isInvalid={isInValid(formik, "ssn")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="fatherName" label="Father Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("fatherName")}
                    isValid={isValid(formik, "fatherName")}
                    isInvalid={isInValid(formik, "fatherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.fatherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="motherName" label="Mother Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("motherName")}
                    isValid={isValid(formik, "motherName")}
                    isInvalid={isInValid(formik, "motherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.motherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isValid={isValid(formik, "username")}
                    isInvalid={isInValid(formik, "username")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isValid={isValid(formik, "password")}
                    isInvalid={isInValid(formik, "password")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isValid={isValid(formik, "confirmPassword")}
                    isInvalid={isInValid(formik, "confirmPassword")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
              <FloatingLabel
                  controlId="advisorTeacher"
                  label="Advisor Teacher"
                  className="mb-3"
                >
                  <Form.Select
                    {...formik.getFieldProps("advisorTeacherId")}
                    isValid={isValid(formik, "advisorTeacherId")}
                    isInvalid={isInValid(formik, "advisorTeacherId")}
                  >
                    <option value="">Select Teacher</option>
                    {advisorTeachers.map((item)=> (<option value={item.advisorTeacherId} key={item.advisorTeacherId}>{item.teacherName} {item.teacherSurname}</option> ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.advisorTeacherId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
             
            </Row>
            <Row>
              <Col className="text-end">
                <Button variant="warning" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  className="ms-3"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonLoader />} Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewStudentForm;
