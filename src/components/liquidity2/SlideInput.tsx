import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
type Props = {};

const SlideInput = (props: Props) => {
  const [range, setRange] = useState([0, 100]);

  const handleChange = (newRange: any) => {
    setRange(newRange);
  };
  const railStyle = {
    backgroundColor: "#9DA5B4",
    height: 20,
    borderRadius: 50,
  };
  const trackStyle = {
    backgroundColor: "#12AFA6",
    height: 20,
    borderRadius: 50,
  };
  const handleStyle = {
    borderColor: "#12AFA6",
    height: 30,
    width: 30,
    marginLeft: -8,

    marginTop: -4,
    backgroundColor: "#fff",
  };
  return (
    <div>
      <Slider
        min={0}
        max={100}
        value={range}
        onChange={handleChange}
        range
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        railStyle={railStyle}
      />
      {/*  <p>
        Range: {range[0]} - {range[1]}
      </p>*/}
    </div>
  );
};
export default SlideInput;
