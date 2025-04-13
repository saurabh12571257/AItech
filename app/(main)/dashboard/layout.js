import React, { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'


const layout = ({children}) => {
  return (
    <div className='px-5'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='text-6xl font-bold gradient-text'>Industry Insights</h1>
        </div>
        <Suspense fallback={<BeatLoader color='#000' size={10} />}>
            <div>
                {children}
            </div> 
        </Suspense>
    </div>
  )
}

export default layout;
