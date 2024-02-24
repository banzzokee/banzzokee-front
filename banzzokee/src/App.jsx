import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import React from 'react';
import './App.css';
import MainPage from './pages/home/MainPage'
import Nav from './components/common/nav/Nav';
import Header from './components/common/header/Header';
import ChatListPage from './pages/chat/ChatListPage';
import ViewArticlePage from './pages/article/ViewArticlePage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/user/MyPage';
import CreateAdoptPage from './pages/article/CreateAdoptPage';
import Notification from './pages/home/Notification';
import Register from './pages/register/Register';
import Back from './components/common/back/Back';
import Tag from './Tag';
import MapPage from './pages/map/MapPage';
import OtherMyPage from './pages/article/OtherMyPage';
import ShelterInfoPage from './pages/article/ShelterInfoPage';
import SettingPage from './pages/setting/SettingPage';
import FollowingPage from './pages/user/FollowingPage';
import AccountInfoPage from './pages/user/AccountInfoPage';
import EmailConfirm from './pages/register/EmailConfirm';
import GoogleRegister from './pages/register/GoogleRegister';
import CreateReviewPage from './pages/article/CreateReviewPage';
import Message from './pages/chat/Message';
import DeleteAccount from './pages/user/DeleteAccount';
import ChangePass from './pages/user/ChangePass';
import ShelterEditPage from './pages/user/ShelterEditPage';
import ShelterRegisterPage from './pages/user/ShelterRegisterPage';
import MyPageEdit from './pages/user/MyPageEdit';
// import GoogleLoginButton from './pages/register/GoogleLoginButton';
import ArticleList from './components/ArticleList';
import AdoptEdit from './pages/article/AdoptEdit';
import ReviewPage from './pages/review/ReviewPage';
import Filter from './pages/home/Filter';
import ReviewList from './components/ReviewList';
import NotificationToken from './NotificationToken';
import ChangeStatus from './pages/article/ChangeStatus';


function App() {
  return (
    <div id="mobileView">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Nav" element={<Nav />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/ChatListPage" element={<ChatListPage />} />
          <Route path="/ViewArticlePage/:id" element={<ViewArticlePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Back" element={<Back />} />
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path="/CreateReviewPage" element={<CreateReviewPage />} />
          <Route path="/Tag" element={<Tag />} />
          <Route path="/OtherMyPage/:id" element={<OtherMyPage />} />
          <Route path="/ShelterInfoPage" element={<ShelterInfoPage />} />
          <Route path="/SettingPage" element={<SettingPage />} />
          <Route path="/FollowingPage" element={<FollowingPage />} />
          <Route path="/AccountInfoPage" element={<AccountInfoPage />} />
          <Route path="/EmailConfirm" element={<EmailConfirm />} />
          <Route path="/Message/:id" element={<Message />} />
          <Route path="/DeleteAccount" element={<DeleteAccount />} />
          <Route path="/ChangePass" element={<ChangePass />} />
          <Route path="/GoogleRegister" element={<GoogleRegister />} />
          <Route path="/CreateReviewPage" element={<CreateReviewPage />} />
          <Route path="/ShelterEditPage" element={<ShelterEditPage />} />
          <Route path="/ShelterRegisterPage" element={<ShelterRegisterPage />} />
          <Route path="/MyPageEdit" element={<MyPageEdit />} />
          {/* <Route path="/GoogleLoginButton" element={<GoogleLoginButton />} /> */}
          <Route path="/ArticleList" element={<ArticleList />} />
          <Route path="/ArticleList/:id" element={<ViewArticlePage />} />
          <Route path="/update/:id" element={<AdoptEdit />} />
          <Route path="/ViewArticlePage" element={<ViewArticlePage />} />
          <Route path="/ReviewPage" element={<ReviewPage />} />
          <Route path="/Filter" element={<Filter />} />
          <Route path="/ReviewList" element={<ReviewList />} />
          <Route path="/changeStatus/:id" element={<ChangeStatus />} />
        </Routes>
        <NotificationToken />
      </BrowserRouter>
    </div>
  );
}

export default App;
