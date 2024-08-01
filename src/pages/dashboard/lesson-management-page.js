import React, { useState } from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { Tab, Tabs } from "react-bootstrap";
import EducationTermList from "../../components/dashboard/lesson-management/education-term-list";
import NewEducationTermForm from "../../components/dashboard/lesson-management/new-education-term-form";
import { useSelector } from "react-redux";
import LessonList from "../../components/dashboard/lesson-management/lesson-list";
import NewLessonForm from "../../components/dashboard/lesson-management/new-lesson-form";
import LessonProgramList from "../../components/dashboard/lesson-management/lesson-program-list";
import NewLessonProgramForm from "../../components/dashboard/lesson-management/new-lesson-program-form";
import LessonAssignment from "../../components/dashboard/lesson-management/lesson-assignment";

const LessonManagementPage = () => {
  const [key, setKey] = useState("terms");
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Lesson Management" />
      <Spacer />
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill={true}
      >
        <Tab eventKey="education" title="Education Term">
          <Spacer height={30} />
          {currentOperation === "new" && (
            <>
              <NewEducationTermForm />
              <Spacer />
            </>
          )}
          <EducationTermList />
        </Tab>
        <Tab eventKey="lessons" title="Lessons">
          <Spacer height={30} />
          {currentOperation === "new" && (
            <>
              <NewLessonForm />
              <Spacer />
            </>
          )}

          <LessonList />
        </Tab>
        <Tab eventKey="programs" title="Lesson Programs">
          <Spacer height={30} />
          {currentOperation === "new" && (
            <>
              <NewLessonProgramForm />
              <Spacer />
            </>
          )}

          <LessonProgramList />
          <Spacer height={30} />
          <LessonAssignment/>
        </Tab>
       
      </Tabs>
       <Spacer />
    </>
  );
};

export default LessonManagementPage;
