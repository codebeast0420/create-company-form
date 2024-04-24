import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [data, setData] = useState({
    companyname: '',
    email: '',
    info1: '',
    info2: ''
  });

  const { companyname, email } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (!companyname || !email) {
      console.log('here')
      return toast.error('Please fill in all fields');
    }

    if (companyname && email && !email.includes('@')) {
      return toast.error('Invalid email');
    }

    try {
      const response = await fetch('https://v1.nocodeapi.com/johndkv/google_sheets/bVXmfrtEwugAUOQZ?tabId=Form responses 1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([[new Date().toLocaleString(), companyname, email]])
      });
      await response.json();
      toast.success('Company added successfully');
      setData({ companyname: '', email: '', info1: '', info2: '' });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: '100vh' }} onSubmit={handleSubmit}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className='w-30 card shadow-lg p-5 form bg-dark' style={{ height: '60vh' }}>
        <div className='card-header text-white text-center'>
          <h1>Create New Company</h1>
        </div>
        <div className='card-body mt-3'>
          <div className='form-group'>
            <input type='text' name='companyname' placeholder='Company' className='form-control mt-1' value={data.companyname} onChange={handleChange} />
          </div>
          <div className='form-group mt-3'>
            <input type='email' name='email' className='form-control mt-1' placeholder='Email' value={data.email} onChange={handleChange} />
          </div>
          <div className='form-group mt-3'>
            <input type='text' name='info1' className='form-control mt-1' placeholder='Information1' value={data.info1} onChange={handleChange} />
          </div>
          <div className='form-group mt-3'>
            <input type='text' name='info2' className='form-control mt-1' placeholder='Information2' value={data.info2} onChange={handleChange} />
          </div>
        </div>
        <div className='card-footer d-flex justify-content-center mt-3'>
          <button className='btn btn-primary mt-2 p-2 w-25'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;