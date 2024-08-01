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
import { createLesson } from "../../../api/lesson-service";
const NewLessonForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    lessonName: "",
    creditScore: "",
    compulsory: "",
  };

  const validationSchema = Yup.object({
    lessonName: Yup.string().required("Required"),
    creditScore: Yup.number().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createLesson(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setlistRefreshToken(Math.random()));
      swalAlert("Lesson was created successfully", "success");
    } catch (err) {
      let errMsg = "";
      if (err.response.data.validations) {
        errMsg = Object.values(err.response.data.validations)[0];
      } else {
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
          <Card.Title>New Lesson</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                <FloatingLabel
                  controlId="lessonName"
                  label="Lesson Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("lessonName")}
                    isValid={isValid(formik, "lessonName")}
                    isInvalid={isInValid(formik, "lessonName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="creditScore"
                  label="Credit Score"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("creditScore")}
                    isValid={isValid(formik, "creditScore")}
                    isInvalid={isInValid(formik, "creditScore")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.creditScore}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id="compulsory"
                  label="Compulsory"
                  {...formik.getFieldProps("compulsory")}
                />
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

export default NewLessonForm;
