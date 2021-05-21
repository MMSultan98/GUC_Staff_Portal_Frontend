import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function SlotsTableListItem(props) {
  return (
    <tr>
      <th className={props.slotNumber === "5" ? "last-slot" : ""}>{props.slotNumber}</th>
      <td>
        {props.slots.filter(slot => slot.day === "Saturday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >
            {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Sunday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >
            {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Monday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >{slot.course}
          <br />
          {slot.room}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Tuesday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >
           {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Wednesday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >
            {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
      <td className={props.slotNumber === "5" ? "last-day" : ""}>
        {props.slots.filter(slot => slot.day === "Thursday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id, slot.staffMember); }}
            className={props.activeSlot === slot._id && props.request === "slotLinkingRequest" ? "schedule-card-active" : "schedule-card"}
          >
          {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
    </tr>
  );
}
SlotsTableListItem.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    staffMember: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  activeSlot: PropTypes.string.isRequired,
  slotNumber: PropTypes.string,
  onClick: PropTypes.func,
  request: PropTypes.string,
};

SlotsTableListItem.defaultProps = {
  onClick: () => {},
  slotNumber: "0",
  request: "",
};
export default SlotsTableListItem;
