import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import StudentList from '../../components/dashboard/student-management/student-list'
import NewMeetForm from '../../components/dashboard/meet-management/new-meet-form'
import EditMeetForm from '../../components/dashboard/meet-management/edit-meet-form'
import MeetList from '../../components/dashboard/meet-management/meet-list'



const MeetManagementPage = () => {
  const {currentOperation} = useSelector(state=> state.misc);
  return (
    <>
    <PageHeader title="Meet Management" />
    <Spacer />
     {currentOperation==="new" &&<><NewMeetForm /><Spacer /></> }
    {currentOperation==="edit" &&<><EditMeetForm /><Spacer /></> } 
    <MeetList />
    <Spacer />
    </>
  )
}

export default MeetManagementPage;