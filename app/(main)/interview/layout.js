import React, { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'


const layout = ({children}) => {
  return (
    <div className='px-5'>
        <Suspense fallback={<BeatLoader color='#000' size={10} />}>
            <div>
                {children}
            </div> 
        </Suspense>
    </div>
  )
}

export default layout;