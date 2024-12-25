import React, { useEffect, useState } from 'react';
import axios from "axios"

const App = () => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNo: "",
  });

  const capitalizeFirstLetter = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getData = async () => {
    const response = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
    if (response) {
      const data = response.data.results[0];
      setData({
        firstName: capitalizeFirstLetter(data.name.first),
        lastName: capitalizeFirstLetter(data.name.last),
        gender: capitalizeFirstLetter(data.gender),
        phoneNo: capitalizeFirstLetter(data.cell)
      })
      setImage(data.picture.large);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="flex items-center justify-center h-[335px] w-[625px] bg-white shadow-md rounded p-8">
        <div className='border-black border-[6px] w-full h-full p-10 mt-1 flex flex-row'>
          <div className='w-[40%] h-[96%] border-black border-[6px] mr-4 flex items-center justify-center'>
            {image && <img src={image} alt="User" className="h-full w-full object-cover rounded" />}
          </div>
          <div className='w-[65%] h-[70%] ml-4 flex flex-col justify-start items-start gap-3 p-2'>
            <div className='flex flex-row w-full'>
              <div className='font-semibold text-xl text-gray-700 px-2'>{data.firstName}</div>
              <div className='font-semibold text-xl text-gray-700 px-6'>{data.lastName}</div>
            </div>
            <div className='font-semibold text-xl text-gray-700 pl-2'>{data.gender}</div>
            <div className='font-semibold text-xl text-gray-700 pl-2'>{data.phoneNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 