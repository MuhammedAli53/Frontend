import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecord, setOperation } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { deleteTeacher, getTeachersByPage } from "../../../api/teacher-service";

const TeacherList = () => {
  const [users, setUsers] = useState([]);
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
      const resp = await getTeachersByPage(page, lazyState.rows);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };

  const handleDelete = async (id) => { 
    const resp = await swalConfirm("Are you sure to delete?");
    if(!resp.isConfirmed) return;
    setLoading(true)
    try {
      await deleteTeacher(id);
      swalAlert("Teacher was deleted", "success")
    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false);
    }
   }

   const handleEdit = (row) => { 
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
   }

  const getOperationButtons = (row) => {
    if (row.built_in)
      return null; /* built in true olanlar için silme butonu olmasın. */
    return (
      <div>
        <Button className="btn-link" onClick={()=>handleEdit(row)}>
          <FaEdit />
        </Button>
        <Button className="btn-link" onClick={()=>handleDelete(row.id)}>
          <FaTimes />
        </Button>
      </div>
    );
  };
  const handleNewUser = () => { 
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
            <span>TeacherList</span>
            <Button onClick={handleNewUser}>New Teacher</Button>
          </Card.Title>
        
        <DataTable
          lazy /* lazy dememiz lazım. DataTabledeki her işi ben kendim halledicem demek istiyoruz. */
          dataKey= "id" 
          totalRecords={totalRows} // toplam kayıt sayısı
          loading={loading} // sayfa geçişleri için bekleme
          value={users} //datatableyi neyle doldurucaz.
          paginator // page sistemi
          rows={lazyState.rows} // bir sayfada kaç satır olacak
          first={lazyState.first} 
          onPage={onPage} //sayfa değişimleri için çalıştırdığımız event
        >
          {/* users datasının içinde ne varsa al yerleştir.  */}
          <Column body={getFullName} header="name"></Column>
          {/* bir colonda 2 farklı datayı barındırmak istiyoruz. Bunun için body attribute var, bunun içine fonksiyon
                koyup istediğin dataları birleştirebilirsin. */}
          <Column field="gender" header="Gender"></Column>
          <Column field="phoneNumber" header="Phone Number"></Column>
          <Column field="ssn" header="Ssn"></Column>
          <Column field="username" header="Username"></Column>
          <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>
        </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TeacherList;
