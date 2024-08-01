import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getStudentInfoByPageForStudent } from "../../../api/student-info-service";

const GradeList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

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
    setLoading(true)
    try {
      const resp = await getStudentInfoByPageForStudent(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            Grade List
          </Card.Title>
        
        <DataTable
          lazy /* lazy dememiz lazım. DataTabledeki her işi ben kendim halledicem demek istiyoruz. */
          dataKey= "id"
          value={list} //datatableyi neyle doldurucaz.
          paginator // page sistemi
          first={lazyState.first} 
          rows={lazyState.rows} // bir sayfada kaç satır olacak
          totalRecords={totalRows} // toplam kayıt sayısı
           onPage={onPage} //sayfa değişimleri için çalıştırdığımız event
          loading={loading} // sayfa geçişleri için bekleme
          tableStyle={{minWidth: "100%"}}
          stripedRows
    
        >
          <Column field="lessonName" header="LessonName"></Column>
          <Column field="absentee" header="Absentee"></Column>
          <Column field="midtermExam" header="Midterm Exam"></Column>
          <Column field="finalExam" header="Final Exam"></Column>
          <Column field="note" header="Note"></Column>
          <Column field="infoNote" header="Message"></Column>
        </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GradeList;
