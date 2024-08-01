import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import Courses from '../components/courses-page/courses'

const CoursesPage = () => {
  return (
    <>
        <PageHeader title="Courses"/>
        <Spacer/>
        <Courses/>
        <Spacer/>
    </>
  )
}

export default CoursesPage