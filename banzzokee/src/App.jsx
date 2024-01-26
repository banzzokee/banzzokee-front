import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/Home/MainPage';
import Nav from './Nav';
import Header from './Header';
import ChatListPage from './pages/Chat/chatListPage';
import ViewArticlePage from './pages/Article/ViewArticlePage';
import LoginPage from './pages/User/LoginPage';
import './App.css';
import MyPage from './pages/User/MyPage';
import CreateAdoptPage from './pages/Article/CreateAdoptPage';
import Notification from './pages/Home/Notification';
import MapPage from './pages/Map/MapPage';
import ShelterMyPage from './pages/Article/ShelterMyPage';
import ShelterInfoPage from './pages/Article/ShelterInfoPage';
import SettingPage from './pages/User/SettingPage';
import FollowingPage from './pages/User/FollowingPage';
import AccountInfoPage from './pages/User/AccountInfoPage';

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
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/ChatListPage" element={<ChatListPage />} />
          <Route path="/ViewArticlePage" element={<ViewArticlePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/ShelterMyPage" element={<ShelterMyPage />} />
          <Route path="/ShelterInfoPage" element={<ShelterInfoPage />} />
          <Route path="/SettingPage" element={<SettingPage />} />
          <Route path="/FollowingPage" element={<FollowingPage />} />
          <Route path="/AccountInfoPage" element={<AccountInfoPage />} />
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
