import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TSlideInputState } from "../helper/types";
import { useBorrowSlideInputState } from "@/hooks/stores/borrowstores";
type Props = {};

const SlideInput = (props: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const { range, setRange } = useBorrowSlideInputState() as TSlideInputState;

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
    <>
      {domLoaded && (
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
        </div>
      )}
    </>
  );
};
export default SlideInput;
