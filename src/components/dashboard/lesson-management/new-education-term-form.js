import { Formik, useFormik } from "formik";
import React, { useState } from "react";
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
import { config } from "../../../helpers/config";
import { createEducationTerms } from "../../../api/education-term-service";
const NewEducationTermForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    endDate: "",
    lastRegistrationDate: "",
    startDate: "",
    term: "",
  };

  const validationSchema = Yup.object({
    term: Yup.string()
      .required("Required")
      .oneOf(
        config.educationTerms.map((item) => item.key),
        "Invalid Term"
      ),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date()
      .required("Required")
      .min(Yup.ref("startDate"), "Must later than start date"),
    lastRegistrationDate: Yup.date()
      .required("Required")
      .max(Yup.ref("startDate"), "Must earlier than start date"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createEducationTerms(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setlistRefreshToken(Math.random()));
      swalAlert("Term was created successfully", "success");
    } catch (err) {
      let errMsg = "";
      if(err.response.data.validations){
        errMsg = Object.values(err.response.data.validations)[0] ;
      }else{
        errMsg = err.response.data.message;
      }
       
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
  });
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Term</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                <FloatingLabel
                  controlId="term"
                  label="Term"
                  className="mb-3"
                >
                  <Form.Select aria-label="Floating label select example"
                   {...formik.getFieldProps("term")}
                   isValid={isValid(formik, "term")}
                   isInvalid={isInValid(formik, "term")}>
                    <option>Select Term</option>
                    {
                      config.educationTerms.map((term)=> <option value={term.key}>{term.label}</option>)
                    }
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.term}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="startDate"
                  label="Start Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("startDate")}
                    isValid={isValid(formik, "startDate")}
                    isInvalid={isInValid(formik, "startDate")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startDate}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="endDate"
                  label="End Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("endDate")}
                    isValid={isValid(formik, "endDate")}
                    isInvalid={isInValid(formik, "endDate")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.endDate}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastRegistrationDate"
                  label="Last Registration Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("lastRegistrationDate")}
                    isValid={isValid(formik, "lastRegistrationDate")}
                    isInvalid={isInValid(formik, "lastRegistrationDate")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastRegistrationDate}
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

export default NewEducationTermForm;
