import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/Home/MainPage';
import Nav from './Nav';
import Header from './Header';
import MyPage from './pages/User/myPage';
import CreateAdoptPage from './pages/Article/CreateAdoptPage';
import Notification from './pages/Home/Notification';

// import Register from './Register'
// import EmailConfirm from './EmailConfirm';
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
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path='/Notification' element={<Notification />} />
          {/* <Route path='/Register' element={<Register />} /> */}
          {/* <Route path='/EmailConfirm' element={<EmailConfirm />} /> */}
          
          {/* <Route path='/Login' element={<Login />} /> */}
          {/* <Route path='/GoogleRegister' element={<GoogleRegister />} /> */}
          {/* <Route path='/Filter' element={<Filter />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
