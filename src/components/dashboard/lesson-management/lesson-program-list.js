import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecord, setOperation, setlistRefreshToken } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { deleteLessonPrograms, getLessonProgramsByPage } from "../../../api/lesson-program-service";

const LessonProgramList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const {listRefreshToken} = useSelector(state => state.misc) ;

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
});
const onPage = (event) => {
  setlazyState(event);
};
  const loadData = async (page) => {
    try {
      const resp = await getLessonProgramsByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => { 
    const resp = await swalConfirm("Are you sure to delete?");
    if(!resp.isConfirmed) return;
    setLoading(true)
    try {
      await deleteLessonPrograms(id);
      dispatch(setlistRefreshToken(Math.random()))
      swalAlert("Program was deleted", "success")
    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false);
    }
   }

  const getOperationButtons = (row) => {
    if (row.built_in)
      return null; /* built in true olanlar için silme butonu olmasın. */
    return (
      <div>
        <Button className="btn-link" onClick={()=>handleDelete(row.lessonProgramId)}>
          <FaTimes />
        </Button>
      </div>
    );
  };

  const getLessonNames = (row) =>{
    return row.lessonName.map(item=> item.lessonName).join("-")

  }
  const handleNewRecord = () => { 
    dispatch(setOperation("new"));
   }
  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Lesson Program List</span>
            <Button onClick={handleNewRecord}>New Lesson Program</Button>
          </Card.Title>
        
        <DataTable
          lazy /* lazy dememiz lazım. DataTabledeki her işi ben kendim halledicem demek istiyoruz. */
          dataKey= "lessonProgramId" 
          totalRecords={totalRows} // toplam kayıt sayısı
          loading={loading} // sayfa geçişleri için bekleme
          value={list} //datatableyi neyle doldurucaz.
          paginator // page sistemi
          rows={lazyState.rows} // bir sayfada kaç satır olacak
          first={lazyState.first} 
          onPage={onPage} //sayfa değişimleri için çalıştırdığımız event
        >
          <Column body={getLessonNames} header="Lessons"></Column>  
          <Column field="day" header="Day"></Column>
          <Column field="startTime" header="Start Time"></Column>
          <Column field="stopTime" header="Stop Time"></Column>
          <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>
        </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonProgramList;
