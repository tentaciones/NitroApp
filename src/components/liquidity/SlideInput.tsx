import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSlideInputState } from "@/hooks/stores/addLiquidityStore";
import { TSlideInputState } from "../helper/types";
type Props = {};

const SlideInput = (props: Props) => {
  const { range, setRange } = useSlideInputState() as TSlideInputState;

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
        allowCross={false}
      />
    </div>
  );
};
export default SlideInput;
