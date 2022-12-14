import React from 'react';
import Header from './components/Header';
import {
  Routes, 
  Route,
} from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import AuthorDetails from './pages/AuthorDetails';
import PrivateRoute from './utils/PrivateRoute';
import Category from './pages/Category';
import Footer from './components/Footer';
import Logout from './components/ui/auth/Logout';

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/logout"       element={<Logout />} />
          <Route path="/categories"   element={<Categories />} />
          <Route path="/category/:categoryId"   element={<Category />} />
          <Route path="/authors"      element={<Categories />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
          <Route path='/author/:authorName-:authorId' element={<AuthorDetails />} />
          <Route path="/store"    element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
            } />
          <Route path="/favorites"    element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
            } />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
  
}

export default App;
