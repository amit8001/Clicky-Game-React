import React from "react";
import "./Title.css";

const Title = props => (
    <div>
    <h1 className="jumbotron">{props.children}</h1>
    </div>
)
export default Title;
