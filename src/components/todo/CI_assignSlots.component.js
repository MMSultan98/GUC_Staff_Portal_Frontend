import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Table, Card, Button, Alert, Input } from "reactstrap";
import SlotTableComponent from "./SlotTable.component";

const CIAssignSlots = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [course, setCourse] = useState("")
    const [courses, setCourses] = useState([])
    const [slots, setSlots] = useState([])
    const [active,setActive]=useState("")
    const [alert,setAlert]=useState("")
    const [error,setError]=useState("")
    const [academicMember,setAcademicMember]=useState("")

    useEffect(() => {
        axiosInstance.get("fe/get-my-courses", {
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }).then(res => setCourses(res.data))
    }, [])
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const chooseCourse = (id) => {
        setCourse(id)
        axiosInstance.get("fe/course-slots", {
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            },
            params: {
                id: id
            }
        }).then(res => { setSlots(res.data) })
    }
    const handleChange = (event)=>{
        setAcademicMember(event.target.value)
    }

    const sendRequest = ()=>{
        axiosInstance("/ci/assign-academic-member-to-slot",{
            method:"PUT",
            headers:{
                "auth-access-token": authTokenManager.getAuthAccessToken()
            },
            data:{
                id:academicMember,
                day:slots.filter(slot=>slot._id===active)[0].day,
                room:slots.filter(slot=>slot._id===active)[0].room,
                slotNumber:slots.filter(slot=>slot._id===active)[0].slotNumber
            }
        }).then(res=>{console.log(res.data);setAlert(("Success"))}).catch(res=>setError(res.data))
    }

    const dropdownCourses = courses.map(course => {
        return <DropdownItem onClick={() => chooseCourse(course.id)} key={course._id}>{course.id + ": " + course.name}</DropdownItem>
    })
    if (slots)
        return <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {course ? course : "Select course"}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownCourses}
                </DropdownMenu>
            </Dropdown>
            <h1>Choose a slot</h1>
            <SlotTableComponent slots={slots.filter(slot=>slot.staffMember==="UNASSIGNED")} onClick={setActive} active={active}/>
            {active?<Input name="academicMember" value={academicMember} onChange={handleChange}></Input>:null}
            <Button type="submit" className={active?"bg-primary":""} onClick={sendRequest}>Assign to slot</Button>
            {alert?<Alert className="bg-success">{alert}</Alert>:null}
            {error?<Alert className="bg-danger">{error}</Alert>:null}
        </>
    else
        return <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {course ? course : "Select course"}
            </DropdownToggle>
            <DropdownMenu>
                {dropdownCourses}
            </DropdownMenu>
        </Dropdown>

}

export default CIAssignSlots;