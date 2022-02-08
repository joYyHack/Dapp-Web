import { FaEthereum } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";

import { TransactionContext } from "../context/TransactionContext";
import React, { useContext } from "react";

const CommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[95px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white hover:bg-sky-900 ease-in duration-100";

const ConnectWallet = () => {};

const HandleTransaction = () => {};

const InputField = ({ placeholder, name, type, value, onChangeFunc }) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={(e) => onChangeFunc(e, name)}
    className='my-2 p-2 w-full rounded-md bg-transparent text-white text-sm white-glassmorphism border-none outline-none'
  />
);

const Welcome = () => {
  const { value } = useContext(TransactionContext);
  console.log(value);

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='text-white flex flex-col mf:flex-row items-start justify-between md:p-20 py-12 px-4'>
        <div className='text-left text-xl flex flex-1 justify-start flex-col mf:mr-10'>
          <h1 className='text-3xl sm:text-5xl text-gradient py-1'>
            Send Crypto <br /> across the world
          </h1>

          <p className='text-base font-light md:w-9/12 w-11/12'>Explore crypto world by AG Service</p>

          <button type='button' onClick={ConnectWallet} className='flex flex-row justify-center item-center my-5 bg-sky-500 p-3 rounded-full cursor-pointer hover:bg-sky-800 ease-linear duration-100'>
            <p className='text-base font-semibold'>Connect Wallet</p>
          </button>

          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`${CommonStyles} rounded-tl-2xl`}>Reliability</div>
            <div className={`${CommonStyles}`}>Ethereum</div>
            <div className={`${CommonStyles} rounded-tr-2xl`}>Web 3.0</div>
            <div className={`${CommonStyles} rounded-bl-2xl`}>Blockchain</div>
            <div className={`${CommonStyles}`}>Low fees</div>
            <div className={`${CommonStyles} rounded-br-2xl`}>Security</div>
          </div>
        </div>
        <div className='flex flex-col flex-1 justify-center items-center'>
          <div className='p-3 rounded-xl h-40 sm:w-72 w-full mf:my-5 my-10 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <FaEthereum fontSize={21} color='' />
                </div>
                <BsInfoCircle fontSize={18} />
              </div>
              <div className='flex justify-between items-start'>
                <div>
                  <p className='font-light text-sm'>Address</p>
                  <p className='font-semibold text-lg'>Ethereum</p>
                </div>
                <div>
                  <p className='font-light text-sm'>Balance</p>
                  <p className='font-semibold text-lg'>10 Eth</p>
                </div>
              </div>
            </div>
          </div>

          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <InputField placeholder='To Address' name='toAddress' type='text' onChangeFunc={() => {}} />
            <InputField placeholder='Amount (ETH)' name='amount' type='number' onChangeFunc={() => {}} />
            <InputField placeholder='Keyword(optional)' name='keyword' type='text' onChangeFunc={() => {}} />
            <InputField placeholder='Message(optional)' name='message' type='text' onChangeFunc={() => {}} />

            <div className='h-[1px] w-full bg-gray-400 my-2'></div>

            {false ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={HandleTransaction}
                className='text-white w-full mt-2 border-[1px] p-2 border-[#3a5494] cursor-pointer rounded-full hover:bg-[#5c6d97] ease-linear duration-200'>
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
