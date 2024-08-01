import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import NewManagerForm from '../../components/dashboard/manager-management/new-manager-form'
import ManagerList from '../../components/dashboard/manager-management/manager-list'
import EditManagerForm from '../../components/dashboard/manager-management/edit-manager-form'

const ManagerManagementPage = () => {
  const {currentOperation} = useSelector(state=> state.misc);
  return (
    <>
    <PageHeader title="Manager Management" />
    <Spacer />
    {currentOperation==="new" &&<><NewManagerForm /><Spacer /></> }
    {currentOperation==="edit" &&<><EditManagerForm /><Spacer /></> }
    <ManagerList />
    <Spacer />
    </>
  )
}

export default ManagerManagementPage;