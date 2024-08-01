import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import Welcome from '../components/about-page/welcome'
import Instructors from '../components/about-page/instructors'

const AboutPage = () => {
  return (
    <>
        <PageHeader title="About"/>
        <Spacer/>
        <Welcome/>
        <Spacer/>
        <Instructors/>
        <Spacer/>
    </>
  )
}

export default AboutPage