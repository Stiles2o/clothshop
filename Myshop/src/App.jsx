import React from 'react'
import Navbar from './assets/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './assets/Footer/Footer';

function App() {

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false}
        draggable pauseOnHover={false} theme="colored" />
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </>

  )
}

export default App
