import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Users from './Users'
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";
import Profile from "./Profile"
export default function App () {
  const token = localStorage.getItem('accessToken');

  return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update' element={<UserUpdate />} />
          <Route path='/Profile' element={<Profile /> } />
        </Routes>
      </div>
  );
}
