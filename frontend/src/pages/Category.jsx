import axios from 'axios';
import React, {useState} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import BookCard from '../components/ui/books/BookCard';

const Category = () => {

  const {categoryId}  = useParams();
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/books/category/${categoryId}`)
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [categoryId])

  return (
    <div className='container flex flex-col flex-wrap space-y-4 items-center justify-center mx-auto mt-12 p-4 px-6 md:flex-row'>
      {books.map(book => (
        <BookCard book={book} key={book.id}/>
      ))}
    </div>
  )
}

export default Category