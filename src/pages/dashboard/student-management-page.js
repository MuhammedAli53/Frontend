import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import StudentList from '../../components/dashboard/student-management/student-list'
import NewStudentForm from '../../components/dashboard/student-management/new-student-form'
import EditStudentForm from '../../components/dashboard/student-management/edit-student-form'



const StudentManagementPage = () => {
  const {currentOperation} = useSelector(state=> state.misc);
  return (
    <>
    <PageHeader title="Student Management" />
    <Spacer />
     {currentOperation==="new" &&<><NewStudentForm /><Spacer /></> }
    {currentOperation==="edit" &&<><EditStudentForm /><Spacer /></> } 
    <StudentList />
    <Spacer />
    </>
  )
}

export default StudentManagementPage;