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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import {
  setlistRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { getUnassignedPrograms } from "../../../api/lesson-program-service";
import { chooseLesson, getAllTeachers } from "../../../api/teacher-service";

const LessonAssignment = () => {
  const [list, setList] = useState([]);
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector((state) => state.misc);

  const loadPrograms = async () => {
    try {
      const data = await getUnassignedPrograms();
      setList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
  };

  const assignTeacherPrograms = async () =>{
    setLoading(true);
    try {
      if(!selectedTeacher) throw new Error("Select a Teacher");
      if(!selectedPrograms || selectedPrograms.length<=0) throw new Error("Select at least a Program");
      
      const payload = {
        lessonProgramId: selectedPrograms.map(item=> item.lessonProgramId),
        teacherId : selectedTeacher
      }
      await chooseLesson(payload);
      dispatch(setlistRefreshToken(Math.random()))
      swalAlert("The Program was assigned", "success")

    } catch (err) {
      console.log(err)
      const errMsg = err?.response?.data?.message || err.message;
      swalAlert(errMsg,"error")
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadPrograms();
    loadTeachers();
    // eslint-disable-next-line
  }, [listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Lesson Program List</span>
          </Card.Title>

          <DataTable
            lazy /* lazy dememiz lazım. DataTabledeki her işi ben kendim halledicem demek istiyoruz. */
            dataKey="lessonProgramId"
            loading={loading} // sayfa geçişleri için bekleme
            value={list} //datatableyi neyle doldurucaz.
            selection={selectedPrograms}
            onSelectionChange={(e) => setSelectedPrograms(e.value)}
          >
            <Column selectionMode="multiple" />{/* birden fazla seçebiliriz. */}
            <Column body={getLessonNames} header="Lessons"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="Stop Time"></Column>
          </DataTable>

          <Row className="mt-3">
            <Col md={10}>
              <FloatingLabel controlId="term" label="Teacher" className="mb-3">
                <Form.Select aria-label="Floating label select example" onChange={(e)=> setSelectedTeacher(e.target.value)}>
                <option value="">Select Teacher</option>
                  {teachers.map((item)=> <option value={item.userId} key={item.userId}>{item.name}{item.surname}</option>)}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={2}>
              <Button variant="success" size="lg" onClick={assignTeacherPrograms}>Assign</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonAssignment;
