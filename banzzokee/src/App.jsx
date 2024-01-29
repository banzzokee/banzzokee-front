import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/Home/MainPage';
import Nav from './components/common/nav/Nav';
import Header from './components/common/header/Header';
import ChatListPage from './pages/chat/chatListPage';
import ViewArticlePage from './pages/article/ViewArticlePage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/user/MyPage';
import CreateAdoptPage from './pages/article/CreateAdoptPage';
import Notification from './pages/home/Notification';
import Register from './pages/register/Register';
import Back from './components/common/back/Back';
import Tag from './Tag';
import MapPage from './pages/map/MapPage'
import ShelterMyPage from './pages/article/ShelterMyPage';
import ShelterInfoPage from './pages/article/ShelterInfoPage';
import SettingPage from './pages/setting/settingPage';
import FollowingPage from './pages/user/FollowingPage';
import AccountInfoPage from './pages/user/AccountInfoPage'
import EmailConfirm from './pages/register/EmailConfirm';
import GoogleRegister from './pages/register/GoogleRegister';
import CreateReviewPage from './pages/article/CreateReviewPage';
import Message from './pages/chat/Message';
import DeleteAccount from './pages/user/DeleteAccount';
// import Filter from './pages/home/Filter';

// import GoogleRegister from './GoogleRegister';

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
          <Route path="/Register" element={<Register />} />
          <Route path="/Back" element={<Back />} />
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path="/CreateReviewPage" element={<CreateReviewPage />} />
          <Route path="/Tag" element={<Tag />} />
          <Route path="/ShelterMyPage" element={<ShelterMyPage />} />
          <Route path="/ShelterInfoPage" element={<ShelterInfoPage />} />
          <Route path="/SettingPage" element={<SettingPage />} />
          <Route path="/FollowingPage" element={<FollowingPage />} />
          <Route path="/AccountInfoPage" element={<AccountInfoPage />} />
          <Route path='/EmailConfirm' element={<EmailConfirm />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/DeleteAccount" element={<DeleteAccount />} />
          <Route path='/GoogleRegister' element={<GoogleRegister />} />
          <Route path='/CreateReviewPage' element={<CreateReviewPage />} />
          {/* <Route path='/Filter' element={<Filter />} /> */}
  
          {/* <Route path='/Login' element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
