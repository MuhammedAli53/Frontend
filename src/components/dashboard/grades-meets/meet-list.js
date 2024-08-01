import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMeetsBByStudent } from "../../../api/meet-service";

const MeetList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const loadData = async () => {
    setLoading(true)
    try {
      const resp = await getMeetsBByStudent();
      setList(resp);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            Meet List
          </Card.Title>
        
        <DataTable
          dataKey= "id"
          value={list} //datatableyi neyle doldurucaz.
          loading={loading} // sayfa geçişleri için bekleme
          tableStyle={{minWidth: "100%"}}
          stripedRows
    
        >
           <Column field="date" header="Date"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
            <Column field="description" header="Description"></Column>
        </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MeetList;
