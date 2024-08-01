import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import LessonProgramListUnselected from '../../components/dashboard/choose-lesson/lesson-program-list-unselected'
import LessonProgramListSelected from '../../components/dashboard/choose-lesson/lesson-program-list-selected'

const ChooseLessonPage = () => {
  const {currentOperation} = useSelector(state=> state.misc);
  return (
    <>
    <PageHeader title="Choose Lesson " />
    <Spacer />
    <LessonProgramListUnselected />
    <Spacer />
    <LessonProgramListSelected/>
    <Spacer/>
    </>
  )
}

export default ChooseLessonPage