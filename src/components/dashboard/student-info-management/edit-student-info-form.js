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
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRecord,
  setOperation,
  setlistRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/functions/swal";
import ButtonLoader from "../../common/button-loader";
import { updateStudentInfo } from "../../../api/student-info-service";
import { getAllLessonProgramByTeacher } from "../../../api/lesson-program-service";
import { getAllStudents } from "../../../api/student-service";
import { getAllEducationTerms } from "../../../api/education-term-service";
const EditStudentInfoForm = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [educationTerms, setEducationTerms] = useState([]);
  const { currentRecord} = useSelector(state => state.misc)

  const initialValues = null;

  const validationSchema = Yup.object({
    absentee: Yup.number().required("Required"),
    educationTermId: Yup.number().required("Required"),
    finalExam: Yup.number().min(0,"Minimum 0").max(100, "Maximum 100").required("Required"),
    infoNote: Yup.string().min(10, "At least 10 chars").required("Required"),
    lessonId: Yup.number().required("Required"),
    midtermExam: Yup.number().min(0,"Minimum 0").max(100, "Maximum 100").required("Required"),
    studentId: Yup.number().required("Required")
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateStudentInfo(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setlistRefreshToken(Math.random()));
      swalAlert("Student info was updated successfully", "success");
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

  const loadLessons = async () => {
    try {
      const data = await getAllLessonProgramByTeacher();
      const arr =[];
      data.forEach((day) => {
        day.lessonName.forEach((item) =>{
          arr.push({id: item.lessonId, label: item.lessonName})
        })
      });
      setLessons(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadEducationTerms = async () => {
    try {
      const data = await getAllEducationTerms();
      setEducationTerms(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    
    loadLessons();
    loadStudents();
    loadEducationTerms();
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    setLoading(true);
      const payload = {
        ...currentRecord,
        studentId: currentRecord?.studentResponse?.userId
      }
      delete payload.studentResponse;
      formik.setValues(payload);
      setLoading(false);
  },[currentRecord])

  if(loading) return null;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Edit Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 ">
              <Col>
            <FloatingLabel controlId="lesson" label="Lesson">
                  <Form.Select
                    aria-label="Select Lesson"
                    {...formik.getFieldProps("lessonId")}
                    isValid={isValid(formik, "lessonId")}
                    isInvalid={isInValid(formik, "lessonId")}
                  >
                    <option>Select Lesson</option>
                    {lessons.map(lesson => <option key={lesson.id} value={lesson.id}>{lesson.label} </option>)}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lessonId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
            <FloatingLabel controlId="student" label="Student">
                  <Form.Select
                    aria-label="Select Student"
                    {...formik.getFieldProps("studentId")}
                    isValid={isValid(formik, "studentId")}
                    isInvalid={isInValid(formik, "studentId")}
                  >
                    <option>Select Students</option>
                    {students.map(student => <option key={student.id} value={student.id}>{student.name} {student.surname} </option>)}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.studentId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
            <FloatingLabel controlId="term" label="Education Term">
                  <Form.Select
                    aria-label="Select Term"
                    {...formik.getFieldProps("educationTermId")}
                    isValid={isValid(formik, "educationTermId")}
                    isInvalid={isInValid(formik, "educationTermId")}
                  >
                    <option>Select Terms</option>
                    {educationTerms.map(term => <option key={term.id} value={term.id}>{term.term} {term.startDate} </option>)}
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.educationTermId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="absentee"
                  label="Absentee"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("absentee")}
                    isValid={isValid(formik, "absentee")}
                    isInvalid={isInValid(formik, "absentee")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.absentee}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="midtermExam"
                  label="Midterm Exam"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("midtermExam")}
                    isValid={isValid(formik, "midtermExam")}
                    isInvalid={isInValid(formik, "midtermExam")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.midtermExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="finalExam"
                  label="Final Exam"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder=""
                    {...formik.getFieldProps("finalExam")}
                    isValid={isValid(formik, "finalExam")}
                    isInvalid={isInValid(formik, "finalExam")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.finalExam}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="infoNote"
                  label="Info"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("infoNote")}
                    isValid={isValid(formik, "infoNote")}
                    isInvalid={isInValid(formik, "infoNote")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.infoNote}
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
                  {loading && <ButtonLoader />} Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditStudentInfoForm;
