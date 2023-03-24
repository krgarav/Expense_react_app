import React from "react";

const Input = (props) =>{
    return <React.Fragment>
        <label>{props.label}:</label>
        <input type={props.type} value={props.value} onChange={props.onChange} id={props.id}/>
    </React.Fragment>
}

export default Input;