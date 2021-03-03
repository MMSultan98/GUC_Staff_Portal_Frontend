import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimePickerField(props) {
  const [field, meta, helpers] = useField(props.name);

  const handleFocus = () => {
    props.setMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <DatePicker
        id={props.name}
        name={props.name}
        value={field.value}
        // onChange={field.onChange}
        onChange={val => {
          helpers.setValue(val);
        }}
        onFocus={handleFocus}
        onBlur={field.onBlur}
        dateFormat="HH:mm:ss"
        timeIntervals={15}
        selected={(field.value && new Date(field.value)) || null}
        showTimeSelect
        showTimeSelectOnly
      />
      <span className="error-message">{meta.touched && meta.error}</span>
    </>
  );
}

TimePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  setMessage: PropTypes.func,
};

TimePickerField.defaultProps = {
  label: null,
  setMessage: () => { },
};

export default TimePickerField;
