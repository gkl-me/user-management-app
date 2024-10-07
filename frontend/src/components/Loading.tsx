import React from 'react'
import loading_gif from '../assets/loading.gif'

const Loading:React.FC = () => {
  return (
    <div className='w-full flex justify-center items-center min-h-screen '>
        <img className='' src={loading_gif} alt="" />
    </div>
  )
}

export default Loading