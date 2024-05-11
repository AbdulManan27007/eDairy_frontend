import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "../Features/Auth/RequireAuth";

import ROLES_LIST from "../Data/Roles.json";
import { AdminTimeTable } from "../Features/Admin/Timetable/AdminTimetable";

import { ClassesCardWrapper } from "../Features/Admin/classes/ClassesCardWrapper";
import { AdminDashboard } from "../Features/Admin/AdminDashboard";
import { TeacherCardWrapper } from "../Features/Admin/StaffTable/TeacherCardWrapper";
import { StudentsCardWrapper } from "../Features/Admin/Students/StudentsCardWrapper";
import { AccountWrapper } from "../Components/account/AccountWrapper";
import TeacherDashboard from "../Features/Teachers/TeacherDashboard";
import { Attendance } from "../Features/Teachers/Attendance/Attendance";
import { AttendanceListStodent } from "../Features/Teachers/Attendance/AttendanceListStodent";

import { TeacherAssignmentContainer } from "../Features/Teachers/Assignment/TeacherAssignmentContainer";
import StudentDashboard from "../Features/Student/StudentDashboard";
import { ParentsCardWrapper } from "../Features/Admin/parents/ParentsCardWrapper";
// import ChatScreen from "../Pages/Chat/ChatScreen";
import Home from "../Pages/Home/Home";
import ChatScreen from "../Pages/Chat/ChatScreen";

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

        <Route path="admin/teachers" element={<TeacherCardWrapper />} />

        <Route path="admin/timetable" element={<AdminTimeTable />} />

        <Route path="admin/students" element={<StudentsCardWrapper />} />
        <Route path="admin/parents" element={<ParentsCardWrapper />} />

        <Route path="admin/profile" element={<AccountWrapper />} />
        <Route path="admin/chat" element={<ChatScreen />} />

        <Route path="admin/e_dairy" element={<TeacherAssignmentContainer />} />
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
        <Route path="teacher/chat" element={<ChatScreen />} />

        <Route
          path="teacher/e_dairy"
          element={<TeacherAssignmentContainer />}
        />
      </Route>

      {/* ------- Student Routes ----------- */}
      <Route
        element={<RequireAuth allowedRoles={ROLES_LIST.Parent} user={user} />}
      >
        <Route path="parent/home" element={<StudentDashboard />} />

        <Route path="parent/e_dairy" element={<TeacherAssignmentContainer />} />

        <Route path="parent/profile" element={<AccountWrapper />} />

        <Route path="parent/attendance" element={<AttendanceListStodent />} />
        <Route path="parent/chat" element={<ChatScreen />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
