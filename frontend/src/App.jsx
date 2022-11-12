import './index.css';
import React from 'react';
import Header from './components/Header';
import {
  Routes, 
  Route,
} from 'react-router-dom';

import Categories from './pages/Categories';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import AuthorDetails from './pages/AuthorDetails';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/categories"   element={<Categories />} />
        <Route path="/authors"      element={<Categories />} />
        <Route path="/store"        element={<Categories />} />
        <Route path="/favorites"    element={<Categories />} />
        <Route path='/book/:bookId' element={<BookDetails />} />
        <Route path='/author/:authorName-:authorId' element={<AuthorDetails />} />

      </Routes>
    </div>
  );
  
}

export default App;
