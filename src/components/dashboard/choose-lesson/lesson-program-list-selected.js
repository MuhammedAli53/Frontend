import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRecord,
  setOperation,
  setlistRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { getAllLessonProgramByStudent, getUnassignedPrograms } from "../../../api/lesson-program-service";

const LessonProgramListSelected = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector((state) => state.misc);

  const loadData = async () => {
    try {
      const resp = await getAllLessonProgramByStudent();
      setLists(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  const getLessonName = (row) => { 
      return row.lessonName.map((item)=> item.lessonName).join("-")
   }
   const getTeacherName = (row) => { 
    return row.teachers.map((item)=> `${item.name} ${item.surname}`).join("-")
 }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Assigned Program List</span>
{/*             <Button onClick={handleNewUser}>New Meet</Button> */} 
         </Card.Title>

          <DataTable
            lazy /* lazy dememiz lazım. DataTabledeki her işi ben kendim halledicem demek istiyoruz. */
            dataKey="lessonProgramId"
            loading={loading} // sayfa geçişleri için bekleme
            value={lists} //datatableyi neyle doldurucaz.
          >
            <Column body={getLessonName} header="Lesson Name"></Column>
            <Column body={getTeacherName} header="Teacher"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
          </DataTable>      
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonProgramListSelected;
