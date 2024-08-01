import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import NewAssistantManagerForm from '../../components/dashboard/assistant-manager-management/new-assistant-manager-form'
import EditAssistantManagerForm from '../../components/dashboard/assistant-manager-management/edit-assistant-manager-form'
import AssistantManagerList from '../../components/dashboard/assistant-manager-management/assistant-manager-list'

const AssistantManagerManagementPage = () => {
  const {currentOperation} = useSelector(state=> state.misc);
  return (
    <>
    <PageHeader title="Assistant Manager Management" />
    <Spacer />
    {currentOperation==="new" &&<><NewAssistantManagerForm /><Spacer /></> }
    {currentOperation==="edit" &&<><EditAssistantManagerForm /><Spacer /></> }
    <AssistantManagerList />
    <Spacer />
    </>
  )
}

export default AssistantManagerManagementPage;