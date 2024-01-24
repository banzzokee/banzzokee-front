import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './pages/Home/MainPage';
import Nav from './Nav';
import Header from './Header';
import MyPage from './pages/User/myPage';
import './App.css';
// import Register from './Register'
// import EmailConfirm from './EmailConfirm';
// import Notification from './Notification';
// import Login from './Login';
// import GoogleRegister from './GoogleRegister';
// import Filter from './Filter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Nav" element={<Nav />} />
          <Route path="/myPage" element={<MyPage />} />
          {/* <Route path='/Register' element={<Register />} /> */}
          {/* <Route path='/EmailConfirm' element={<EmailConfirm />} /> */}
          {/* <Route path='/Notification' element={<Notification />} /> */}
          {/* <Route path='/Login' element={<Login />} /> */}
          {/* <Route path='/GoogleRegister' element={<GoogleRegister />} /> */}
          {/* <Route path='/Filter' element={<Filter />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
