import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import GradeList from '../../components/dashboard/grades-meets/grade-list'
import MeetList from '../../components/dashboard/grades-meets/meet-list'


const GradeMeetPage = () => {
  return (
    <>
    <PageHeader title="Grade & Meet" />
    <Spacer />
    <GradeList/>
    <MeetList />
    <Spacer />
    </>
  )
}

export default GradeMeetPage;