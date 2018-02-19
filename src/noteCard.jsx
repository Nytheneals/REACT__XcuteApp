import React from "react";

// STATELESS COMPONENT

export default function(props) {
  return (
    <div className="noteCard">
      <i className="fa fa-edit" />
      <i className="fa fa-times" />
      <h4>{props.note.title}</h4>
      <p>{props.note.note}</p>
    </div>
  );
}
