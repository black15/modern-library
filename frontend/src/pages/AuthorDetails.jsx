import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import BookCard from '../components/ui/books/BookCard';

function AuthorDetails() {
  const {authorName, authorId}  = useParams();
  const [books ,setBooks]       = useState([]);
  const [author ,setAuthor]     = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/authors/books/${authorId}`)
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`http://127.0.0.1:8000/api/v1/authors/${authorId}`)
      .then(res => {
        setAuthor(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [authorId])
  return (
    <div className="container mx-auto p-2 px-6 flex flex-col space-y-6 mt-6 font-noto">
      <div id="description" className="flex flex-row shadow-lg rounded-lg p-6 drop-shadow w-auto px-6 md:mr-12">
        <div>
          <img className='rounded-full ml-6' src={`http://127.0.0.1:8000${author.photo}`} height={50} width={100} alt='Author'/>
        </div>
        <div>
          <h1 className="max-w-md text-xl text-gray-800 font-medium">{authorName}</h1>
          <p className="max-w-6xl mt-4 text-lg text-gray-700">{author.descreption}</p>
        </div>
      </div>
      <div className="container mx-auto p-2 px-6 mt-6 font-noto">
        <h1 className='max-w-md text-2xl text-gray-800 font-medium mt-6 md:mr-12'>كتب {authorName}</h1></div>
      <div className='flex flex-col items-center mt-12 p-4 px-6 md:flex-row'>
        {books.map( book => (
          <BookCard book={book} key={book.id}/>
        ) )}
      </div>
    </div>
  )
}

export default AuthorDetails