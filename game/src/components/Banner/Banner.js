import React from "react";
import "./Banner.css";

const Banner = props => (
    <div>
    <p>
    <b>Message: </b><span id="st">{props.status}</span>
    <span id="sc">Score: {props.currentScore} </span>
    <span id="sep">|</span>
    <span id="ts">Top Score: {props.topScore}</span>
    </p>
    </div>
)
export default Banner;
