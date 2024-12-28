import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import { login,logout } from './store/authSlice';
import { Footer,Header } from './components';
import { Outlet } from 'react-router-dom';


function App() {
  const [loding,setloading]=useState(true);
  const dispatch=useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((useData)=>{
      if (userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>setloading(false));
  },[])
  

  return !loding?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): null;
}

export default App
