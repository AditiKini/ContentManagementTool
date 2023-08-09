import React, { useState } from "react";
import DataProvider from "./context/dataProvider";
import Login from "./components/UserAccount/Login";
import Home from "./components/HomePage/Home";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from "./components/Header/header";
import Post from "./components/CreateBlog/Post";
import DetailsPage from "./components/Details/DetailsPage";
import Update from "./components/CreateBlog/Update";
import About from "./components/about/About";

const PrivateRoute = ({ isUserAuthenticated, ...props}) => {

  return isUserAuthenticated ? 
  <>
    <Header />
    <Outlet />
  </> : <Navigate replace to='/login' />
}

const App = () => {

  const [isUserAuthenticated, setUser] = useState(false);

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <div style={{ marginTop: 30 }}>
            <Routes>
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/' element={<Home />} />
              </Route>

              <Route path='/create' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/create' element={<Post />} />
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/details/:id' element={<DetailsPage />} />
              </Route>

              <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/update/:id' element={<Update />} />
              </Route>

              <Route path='/about' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                <Route path='/about' element={<About />} />
              </Route>

            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </>
  )
}

export default App;