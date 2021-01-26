import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import MySchedule from "../todo/schedule.component";
import GeneralRequests from "../todo/GeneralRequestsPage.component";


class TaHomePage extends React.Component {

    render() {

        if (localStorage.userRole !== "Teaching Assistant") {
            return <ForbiddenAccess />;
        }
        
        return (
            <div className="home-margin">
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/requests`}>Requests</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/academic-members`}>Academic Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hr-members`}>Hr Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                </div>
                <div>
                    <Route path={this.props.match.path}> <Sidebar /> </Route>
                    <Route path={`${this.props.match.path}/requests`}> <GeneralRequests /> </Route>
                    <Route path={`${this.props.match.path}/schedule`}> <MySchedule /> </Route>
                </div>
            </div>
        )
    }
}


export default withRouter(TaHomePage);