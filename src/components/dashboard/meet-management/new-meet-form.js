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
import { createStudent, getAllStudents } from "../../../api/student-service";
import { getAllAdvisorTeachers } from "../../../api/advisor-teacher-service";
import { createMeet } from "../../../api/meet-service";
import { MultiSelect } from "primereact/multiselect";
const NewMeetForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([])
  const initialValues = {
    date: "",
    description: "",
    startTime: "",
    stopTime: "",
    studentIds: []
  }

  const validationSchema = Yup.object({
    description: Yup.string().min(2).max(16).required("Required"),
    startTime: Yup.string().required("Required"),
    stopTime: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    studentIds: Yup.array().min(1, "Required").required("Required")
    
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createMeet(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setlistRefreshToken(Math.random()));
      swalAlert("Meet was created successfully", "success");
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
  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      const arr = data.map(item=> ({id: item.id, name: `${item.name} ${item.surname}`}))
      setStudents(arr);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    loadStudents();
    // eslint-disable-next-line
  },[])
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Meet</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
              <MultiSelect
                  value={formik.values.studentIds}
                  onChange={(e) =>
                    formik.setFieldValue("studentIds", e.value)
                  }
                  options={students}
                  optionLabel="name"
                  display="chip"
                  placeholder="Select Students"
                  maxSelectedLabels={3}
                  optionValue="id"
                />
              </Col>
              <Col>
                <FloatingLabel
                  controlId="date"
                  label="Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("date")}
                    isValid={isValid(formik, "date")}
                    isInvalid={isInValid(formik, "date")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="startTime"
                  label="Start Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("startTime")}
                    isValid={isValid(formik, "startTime")}
                    isInvalid={isInValid(formik, "startTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="stopTime"
                  label="Stop Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("stopTime")}
                    isValid={isValid(formik, "stopTime")}
                    isInvalid={isInValid(formik, "stopTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stopTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("description")}
                    isValid={isValid(formik, "description")}
                    isInvalid={isInValid(formik, "description")}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
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

export default NewMeetForm;
