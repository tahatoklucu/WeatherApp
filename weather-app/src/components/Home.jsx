import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';

function Main() {
  return (
    <>
    <div className='container p-5 w-full justify-center mx-auto'>
        <div className='text-center justify-center flex rounded-lg border-1 border-[#749BC2] inset-shadow-sm w-full p-5 shadow-md'>
            <label className='text-left justify-left p-2 text-[#dee0ea] text-xl h-auto md:h-5vh'>Weather App</label>
            <input type='text' placeholder='Select country or city' className='w-310 mx-auto bg-[#dee0ea] p-2 rounded-md shadow-lg' />
            <SettingsIcon className='text-white m-2 cursor-pointer mr-5 md:h-5px' />
        </div>
        <div className='left-side'></div>
    </div>
    </>
  )
}

export default Main