import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import {
  setCurrentRecord,
  setOperation,
  setlistRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { getUnassignedPrograms } from "../../../api/lesson-program-service";
import { chooseLesson } from "../../../api/student-service";
import ButtonLoader from "../../common/button-loader";

const LessonProgramListUnselected = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([])
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getUnassignedPrograms();
      setLists(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      //await deleteMeet(id);
      dispatch(setlistRefreshToken(Math.random()))
      swalAlert("Meet was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
  };

  const getLessonName = (row) => { 
      return row.lessonName.map((item)=> item.lessonName).join("-")
   }
   const getTeacherName = (row) => { 
    return row.teachers.map((item)=> `${item.name} ${item.surname}`).join("-")
 };
///////////////////////////////
 const handleSelect = async () => { 
  setLoading(true);
  try {
    if(selectedPrograms.length<=0) throw new Error("Select at least a program")
    const payload = {
    lessonProgramId : selectedPrograms.map(item=> item.lessonProgramId)
  } 
    await chooseLesson(payload);
    swalAlert("Program assignment was completed");
    dispatch(setlistRefreshToken(Math.random())); 
  } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message
      swalAlert(errMsg, "error")
  }finally{
    setLoading(false)
  }
}
/////////////////////////////////////

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Unassigned Program List</span>
{/*             <Button onClick={handleNewUser}>New Meet</Button> */} 
         </Card.Title>

          <DataTable
            dataKey="lessonProgramId"
            loading={loading} // sayfa geçişleri için bekleme
            value={lists} //datatableyi neyle doldurucaz.
            selection={selectedPrograms}
            onSelectionChange={(e)=>setSelectedPrograms(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{width:"40px"}}></Column>
            <Column body={getLessonName} header="Lesson Name"></Column>
            <Column body={getTeacherName} header="Teacher"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
            
            {/* users datasının içinde ne varsa al yerleştir.  */}
{/*             <Column body={getStudents} header="Students"></Column>
 */}            {/* bir colonda 2 farklı datayı barındırmak istiyoruz. Bunun için body attribute var, bunun içine fonksiyon
                koyup istediğin dataları birleştirebilirsin. */}

          </DataTable>
          <div className="mt-4 text-center">
          <Button onClick={handleSelect} disabled= {loading}>{loading && <ButtonLoader/>} Select</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonProgramListUnselected;
