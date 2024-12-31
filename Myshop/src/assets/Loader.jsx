import React from 'react'
import LoaderImg from '../assets/image/Spinner.gif'
import './css/Loader.css'
import ReactDOM from 'react-dom'

const Loader = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='loader'>
                <img src={LoaderImg} alt="" height={"70 px"} width={"70px"} />
            </div>
        </div>, document.getElementById('loader')
    )
}

export default Loader
