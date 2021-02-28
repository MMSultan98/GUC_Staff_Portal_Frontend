import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import MySchedule from "../../todo/schedule.component";
import GeneralRequests from "../../todo/GeneralRequestsPage.component";
import Attendance from "../general_staff_components/attendance_components/Attendance";
import TaHomeMain from "./TaHomeMain";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import TAAcademicMembers from "./TaAcademicMembers";
import TACourses from "./TaCourses";

function TaHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Teaching Assistant") {
    return <Redirect to="/403" />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><TaHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/my-attendance`}><Attendance /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/schedule`}><MySchedule /></Route>
        <Route path={`${match.path}/courses`}><TACourses /></Route>
        <Route path={`${match.path}/academic-members`}><TAAcademicMembers /></Route>

        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

TaHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};

export default TaHome;
