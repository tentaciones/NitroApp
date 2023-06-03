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
    height: 10,
    borderRadius: 5,
  };
  const trackStyle = {
    backgroundColor: "#12AFA6",
    height: 10,
    borderRadius: 5,
  };
  const handleStyle = {
    borderColor: "#12AFA6",
    height: 20,
    width: 20,

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

      <p className="flex justify-between hover:opacity-100 opacity-0">
        <p>{range[0]}% </p>
        <p> {range[1]}%</p>
      </p>
    </div>
  );
};
export default SlideInput;
