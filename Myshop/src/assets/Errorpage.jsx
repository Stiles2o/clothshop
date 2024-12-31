import React from 'react'
import cssmod from './css/404err.module.css'

const Errorpage = () => {
    return (
        <div className={cssmod.error}>
            <h1 className='pl-20'>404</h1>
            <h2>Page Not Found</h2>
        </div>
    )
}

export default Errorpage
