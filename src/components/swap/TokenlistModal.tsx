import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { tokenData } from "@/constants/pooldata";
import {
  useSelectedSwapTokenstate,
  useSwapTokenstate,
} from "@/hooks/stores/swapStore";
import Image from "next/image";
type Props = {};

const TokenlistModal = (props: Props) => {
  const {
    selectedTokenX,
    setSelectedTokenX,
    selectedTokenY,
    setSelectedTokenY,
  }: any = useSelectedSwapTokenstate();
  const { showTokenX, setShowTokenX, showTokenY, setShowTokenY }: any =
    useSwapTokenstate();
  return (
    <div className="h-screen  px-2 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
      <div className="h-[600px] w-[500px] bg-[#031120] px-10 rounded-2xl ">
        <div className="flex justify-between items-center mt-10">
          <p>Select Token</p>

          <IoClose
            className="text-2xl hover:cursor-pointer"
            onClick={() => {
              if (showTokenX) {
                setShowTokenX(false);
              } else if (showTokenY) {
                setShowTokenY(false);
              }
            }}
          />
        </div>
        <div className="w-full  flex items-center mt-5 ">
          <input
            type="text"
            className="w-full h-[40px] rounded-2xl outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-8 placeholder:text-[#828282] placeholder:font-[200]"
            placeholder="search "
          />
          <CiSearch className="absolute mx-3 " />
        </div>
        <div className="h-[420px]  mt-5">
          {tokenData.map(({ image, name }) => {
            return (
              <div
                key={name}
                className="flex gap-2 mt-5 hover:cursor-pointer w-full "
                onClick={() => {
                  if (showTokenX) {
                    setSelectedTokenX({
                      name,
                      image,
                    });
                    setShowTokenX(false);
                  } else if (showTokenY) {
                    setSelectedTokenY({
                      name,
                      image,
                    });
                    setShowTokenY(false);
                  }
                }}
              >
                {" "}
                <Image src={image} alt="" height={0} width={0} />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenlistModal;
