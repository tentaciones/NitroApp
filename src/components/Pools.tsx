import React from "react";

type Props = {};

const Pools = (props: Props) => {
  return (
    <table className="w-full text-sm text-left  text-white h-[600px] mt-10 rounded-xl">
      <thead className="w-full h-[60px]">
        <tr className="h-[60px] flex items-start bg-background text-[#B7BECD] w-full">
          <th
            scope="col"
            className="w-[25%] h-full flex justify-center items-center font-thin px-3"
          >
            Assets
          </th>
          <th
            scope="col"
            className="w-[10%] h-full flex justify-center items-center font-thin px-3"
          >
            TVL
          </th>
          <th
            scope="col"
            className="w-[10%] h-full flex justify-center items-center font-thin px-3"
          >
            Token X
          </th>
          <th
            scope="col"
            className="w-[10%] h-full flex justify-center  items-center font-thin px-3"
          >
            Token Y
          </th>
          <th
            scope="col"
            className="w-[15%] h-full flex justify-center items-center font-thin px-3"
          >
            Trading Volumes
          </th>
          <th
            scope="col"
            className="w-[10%] h-full flex justify-center items-center font-thin px-3"
          >
            Debt Ratio
          </th>
          <th
            scope="col"
            className="w-[20%] h-full flex justify-center  items-center font-thin px-3"
          >
            Nitro Points Generated
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default Pools;
