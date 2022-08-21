import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUp from './pages/signup';
import Signin from './pages/signin';
import Main from './pages/Main';
import ViewPost from './pages/ViewPost';
import SubmitPost from './pages/SubmitPost';
import ViewCommunity from './pages/ViewCommunity';

function App() {
  return (
    <div data-testid="cmty-app-component">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/submit" element={<SubmitPost />} />
        <Route path="/c/:community/post/:id" element={<ViewPost />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/c/:community" element={<ViewCommunity />} />
      </Routes>
    </div>
  );
}

export default App;
