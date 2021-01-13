import React, { useState } from "react";
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AcademicMemberForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        name: "Name",
        email: "Email",
        department: "Department",
        office: "Office",
        salary: "Salary",
        password: "Password"
    }

    const initialValues = {
        name: props.academicMember.name,
        email: props.academicMember.email,
        gender: props.academicMember.gender,
        role: props.academicMember.role,
        department: props.academicMember.department,
        office: props.academicMember.office,
        salary: props.academicMember.salary,
        dayOff: props.academicMember.dayOff,
        password: props.academicMember.password
    }

    const validationSchemaAdd = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        department: Yup.string(),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Salary must be a number")
            .required("This field is required")
            .positive("Salary must be a positive number")
            .integer("Salary must be an integer"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid gender"),
        role: Yup.string()
            .required("This field is required")
            .oneOf(["Course Instructor", "Head of Department", "Teaching Assistant"], "Invalid role"),
        dayOff: Yup.string()
            .required("This field is required")
            .oneOf(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "Invalid day off")
    });

    const validationSchemaUpdate = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        department: Yup.string(),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Salary must be a number")
            .required("This field is required")
            .positive("Salary must be a positive number")
            .integer("Salary must be an integer"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid gender"),
        role: Yup.string()
            .required("This field is required")
            .oneOf(["Course Instructor", "Head of Department", "Teaching Assistant"], "Invalid role"),
        dayOff: Yup.string()
            .required("This field is required")
            .oneOf(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "Invalid day off"),
        password: Yup.string()
            .required("This field is required")
    });

    const validationSchema = props.formType === "add" ? validationSchemaAdd : validationSchemaUpdate;

    const handleSubmit = async values => {
        await axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-academic-member${props.formType === "add" ? "" : `/${props.academicMember.id}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                email: values.email,
                gender: values.gender,
                role: values.role,
                department: values.department,
                office: values.office,
                salary: values.salary,
                dayOff: values.dayOff,
                password: values.password
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
            })
            .catch(error => {
                if (error.response) {
                    setMessageStyle("form-error-message");
                    setMessage(error.response.data);
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    };
    const handleFocus = (e) => {
        e.target.placeholder = "";
    };

    const handleBlur = (e, formikProps) => {
        e.target.placeholder = placeholders[e.target.name];
        formikProps.setFieldTouched(e.target.name);
    };

    const renderPassword = (formikProps) => {
        return (
            <>
                <Field name="password" type="password" placeholder={placeholders.password}
                    onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                <div className="form-input-error-message">
                    <ErrorMessage name="password" />
                </div>
            </>
        );
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name" />
                        </div>
                        <Field name="email" type="email" placeholder={placeholders.email}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="email" />
                        </div>
                        <Field name="gender" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="gender" />
                        </div>
                        <Field name="role" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Role</option>
                            <option value="Course Instructor">Course Instructor</option>
                            <option value="Head of Department">Head of Department</option>
                            <option value="Teaching Assistant">Teaching Assistant</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="role" />
                        </div>
                        <Field name="department" placeholder={placeholders.department}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="department" />
                        </div>
                        <Field name="office" placeholder={placeholders.office}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="office" />
                        </div>
                        <Field name="salary" placeholder={placeholders.salary}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="salary" />
                        </div>
                        <Field name="dayOff" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Day Off</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="dayOff" />
                        </div>
                        {props.formType === "update" ? renderPassword(formikProps) : <></>}
                        <div>
                            <button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add academic member" : "Update academic member"}</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AcademicMemberForm;