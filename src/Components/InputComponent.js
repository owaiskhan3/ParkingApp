import React from "react";

export default function InputComponent(props) {
  console.log(props);
  return (
    <div className="row" style={{ marginBottom: 0 }}>
      <div className="input-field col s16">
        <input
          id={props.id}
          type={props.type}
          className="validate"
          style={{ width: "280px" }}
          onChange={e => {
            props.setKeys(props.keys, e.target.value);
          }}
        />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  );
}
