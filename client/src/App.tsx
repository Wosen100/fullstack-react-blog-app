import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddPost from './pages/AddPost';
import SignUp from './pages/signup';
import Main from './pages/Main';
import ViewPost from './pages/ViewPost';
import SubmitPost from './pages/SubmitPost';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
