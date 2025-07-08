import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

function Main() {
  return (
    <>
    <div className='container p-5 w-full justify-center mx-auto'>
        <div className='text-center justify-center flex rounded-lg border-1 border-[#749BC2] inset-shadow-sm w-full p-5 shadow-md'>
            <label className='text-left justify-left p-2 text-[#dee0ea] text-xl'>Weather App</label>
            <SearchIcon className='text-white mt-2 ml-5' />
            <input type='text' placeholder='Select country or city' className='w-300 mx-auto bg-[#dee0ea] p-2 rounded-md shadow-lg' />
            <SettingsIcon className='text-white m-2 cursor-pointer' />
        </div>
        <div className='left-side'></div>
    </div>
    </>
  )
}

export default Main