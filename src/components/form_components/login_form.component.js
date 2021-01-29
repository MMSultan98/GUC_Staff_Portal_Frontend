import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import errorMessages from "../../others/error_messages";
import formImage from "../../images/guc_building.jpg";
import authTokenManager from "../../others/auth_token_manager";

function LoginForm() {
	const [errorMessage, setErrorMessage] = useState("");
	const axiosCancelSource = axios.CancelToken.source();


	const cancelRequests = () => {
		return () => { axiosCancelSource.cancel(errorMessages.requestCancellation); };
	};
	useEffect(cancelRequests, []);

	const placeholders = {
		email: "Email",
		password: "Password"
	};

	const initialValues = {
		email: "",
		password: ""
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("This field is required"),
		password: Yup.string()
			.required("This field is required")
	});

	const handleSubmit = async (values, formikProps) => {
		await axiosInstance({
			method: "post",
			url: "/staff/login",
			cancelToken: axiosCancelSource.token,
			data: {
				"email": values.email,
				"password": values.password
			}
		})
			.then(response => {
				authTokenManager.setAuthAccessToken(response.headers["auth-access-token"]);
				localStorage.setItem("login", Date.now());
				dispatchEvent(new Event("login"));
			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log(`Request cancelled: ${error.message}`);
				}
				else {
					if (error.response) {
						formikProps.setFieldValue("password", "");
						formikProps.setFieldTouched("password", false, false);
						setErrorMessage(error.response.data);
						console.log(error.response);
					}
					else if (error.request) {
						console.log(error.request);
					}
					else {
						console.log(error.message);
					}
				}
			});
	};

	const handleFocus = (e) => {
		e.target.placeholder = "";
		setErrorMessage("");
	};

	const handleBlur = (e, formikProps) => {
		e.target.placeholder = placeholders[e.target.name];
		formikProps.setFieldTouched(e.target.name);
	};


	if (authTokenManager.getAuthAccessToken()) {
		return <Redirect to="/staff" />;
	}

	return (
		<div className="login-main-container">
			<div className="container-fluid login-form-container">
				<div className="row">
					<div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
						<div className="card align-items-center rounded-border">
							<img className="card-img-top rounded-top-border" src={formImage}></img>
							<div className="card-body">
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}>
									{formikProps => (
										<Form>
											<label htmlFor="email">
												<FontAwesomeIcon className="login-form-icon" icon="user" />
											</label>
											<Field className="bottom-border" name="email" placeholder={placeholders.email}
												onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
											<div className="form-input-error-message">
												<ErrorMessage name="email" />
											</div>
											<br />

											<label htmlFor="password">
												<FontAwesomeIcon className="login-form-icon" icon="lock" />
											</label>
											<Field className="bottom-border" type="password" name="password" placeholder={placeholders.password}
												onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
											<div className="form-input-error-message">
												<ErrorMessage name="password" />
											</div>

											<div className="text-center">
												<button className="login-button" type="submit" disabled={formikProps.isSubmitting} onClick={() => { setErrorMessage(""); }}>LOG IN</button>
												<div className="form-error-message">{errorMessage}</div>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;