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
import MyPage from './pages/User/myPage';
import CreateAdoptPage from './pages/Article/CreateAdoptPage';
import Notification from './pages/Home/Notification';
import Register from './pages/User/Register';
import Back from './Back';
import CreateReviewPage from './pages/Article/CreateReviewPage';
import Tag from './Tag';

// import EmailConfirm from './EmailConfirm';
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
          <Route path="/CreateAdoptPage" element={<CreateAdoptPage />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Back' element={<Back />} />
          <Route path='/CreateAdoptPage' element={<CreateAdoptPage />} />
          <Route path='/CreateReviewPage' element={<CreateReviewPage />} />
          <Route path='/Tag' element={<Tag />} />
          {/* <Route path='/EmailConfirm' element={<EmailConfirm />} /> */}
          {/* <Route path='/GoogleRegister' element={<GoogleRegister />} /> */}
          {/* <Route path='/Filter' element={<Filter />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
