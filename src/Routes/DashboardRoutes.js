import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PersistLogin from "../Features/Auth/persistLogin";
import RequireAuth from "../Features/Auth/RequireAuth";

import ROLES_LIST from "../Data/Roles.json";
import { AdminTimeTable } from "../Features/Admin/Timetable/AdminTimetable";

import { ClassesCardWrapper } from "../Features/Admin/classes/ClassesCardWrapper";
import { SectionsCardWrapper } from "../Features/Admin/classes/SectionsCardWrapper";
import { AdminDashboard } from "../Features/Admin/AdminDashboard";
import { SubjectCardWrapper } from "../Features/Admin/classes/SubjectCardWrapper";
import { TeacherCardWrapper } from "../Features/Admin/StaffTable/TeacherCardWrapper";
import { StudentsCardWrapper } from "../Features/Admin/Students/StudentsCardWrapper";
import { AccountWrapper } from "../Components/account/AccountWrapper";
import TeacherDashboard from "../Features/Teachers/TeacherDashboard";
import { Attendance } from "../Features/Teachers/Attendance/Attendance";
import { AttendanceListStodent } from "../Features/Teachers/Attendance/AttendanceListStodent";

import { TeacherAssignmentContainer } from "../Features/Teachers/Assignment/TeacherAssignmentContainer";
import StudentDashboard from "../Features/Student/StudentDashboard";

const DashboardRoutes = ({ user }) => {
  return (
    <Routes>
      {/* --------- Admin Routes ------- */}
      <Route
        element={<RequireAuth allowedRoles={ROLES_LIST.Admin} user={user} />}
      >
        <Route index element={<Navigate to="admin/home" />} />
        <Route path="admin/home" element={<AdminDashboard />} />
        <Route path="admin/classes" element={<ClassesCardWrapper />} />
        <Route path="admin/sections" element={<SectionsCardWrapper />} />
        <Route path="admin/subjects" element={<SubjectCardWrapper />} />

        <Route path="admin/teachers" element={<TeacherCardWrapper />} />

        <Route path="admin/timetable" element={<AdminTimeTable />} />

        <Route path="admin/students" element={<StudentsCardWrapper />} />
        <Route path="admin/profile" element={<AccountWrapper />} />

        <Route path="admin/e_dairy" element={<TeacherAssignmentContainer />} />

        {/*   <Route path="admin/:classId/staffInfo" element={<StaffContainer />} />

        <Route
          path="admin/:classId/studentInfo"
          element={<StudentContainer />}
        /> */}
      </Route>

      {/* --------- Teacher Routes ------- */}
      <Route
        element={<RequireAuth allowedRoles={ROLES_LIST.Teacher} user={user} />}
      >
        <Route index element={<Navigate to="teacher/home" />} />
        <Route path="teacher/home" element={<TeacherDashboard />} />
        <Route path="teacher/timetable" element={<AdminTimeTable />} />

        <Route path="teacher/attendance" element={<Attendance />} />
        <Route path="teacher/profile" element={<AccountWrapper />} />
        <Route
          path="teacher/e_dairy"
          element={<TeacherAssignmentContainer />}
        />

        {/* <Route path="" element={<TeacherDashboard />} />
        <Route
          path="teacher/:classId/students"
          element={<StudentContainer />}
        />
        <Route
          path="teacher/:classId/assignment"
          element={<TeacherAssignmentContainer />}
        />
        <Route path="teacher/:classId/timetable" element={<TimeTableBox />} />
        <Route
          path="teacher/:classId/calendar"
          element={<TeacherCalendarContainer />}
        />
        <Route
          path="teacher/:classId/examinations"
          element={<TeacherExaminationContainer />}
        />
        <Route
          path="teacher/:classId/results"
          element={<TeacherResultsContainer />}
        />
        <Route path="teacher/:classId/attendance" element={<Attendance />} />
        <Route path="teacher/:classId/miscellaneous" element={<OtherInfo />} /> */}
      </Route>

      {/* ------- Student Routes ----------- */}
      <Route
        element={<RequireAuth allowedRoles={ROLES_LIST.Parent} user={user} />}
      >
        <Route path="parent/home" element={<StudentDashboard />} />

        <Route path="parent/e_dairy" element={<TeacherAssignmentContainer />} />

        <Route path="parent/profile" element={<AccountWrapper />} />

        <Route path="parent/attendance" element={<AttendanceListStodent />} />

        {/*    <Route path="student/:classId/assignments" element={<Assignments />} />
        <Route path="student/:classId/timetable" element={<Timetable />} />
        <Route
          path="student/:classId/calendar"
          element={<CalendarContainer />}
        />
        <Route path="student/:classId/examinations" element={<Examination />} />
        <Route path="student/:classId/results" element={<Results />} />
      </Route> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
