import React, { FC } from "react";
import successIcon from "@/assets/components/Successful.svg";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {
  text: string;
  arbiscanLink: string;
};

const SuccessCard: FC<Props> = ({ text, arbiscanLink }) => {
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  return (
    <>
      {isSuccessfull && (
        <div className="h-full px-2 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
          <div className="h-[300px] w-[400px] bg-[#031120] px-10 rounded-2xl ">
            <div className="flex justify-end pt-5">
              <IoClose
                className="text-2xl hover:cursor-pointer"
                onClick={() => setIsSuccessfull(false)}
              />
            </div>
            <div className="flex justify-center items-center mt-7">
              {" "}
              <Image src={successIcon} height={0} width={0} alt="" />
            </div>
            <div className="flex justify-center mt-5">
              <p>{text}</p>
            </div>
            <Link
              href={arbiscanLink}
              className="underline text-sm flex justify-center hover:cursor-pointer text-[#0987D3]"
            >
              <p>View on Arbiscan</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessCard;
