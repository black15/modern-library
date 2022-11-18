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
    <>
      {
        books.length !== 0
          ?
          <div className='container space-y-4 mx-auto mt-12 p-4 px-6 md:flex-row'>
            <div className="rounded shadow bg-slate-50 p-4 px-6 mb-6">
              <h1 className="max-w-lg text-gray-700 text-xl font-medium font-noto">
              كل الكتب المتوفرة في هذا القسم
              </h1>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start">
              {books.map(book => (
                <BookCard book={book} key={book.id}/>
              ))}
            </div>
          </div>
          : 
          <div className="container mx-auto mt-12 p-4 px-6">
            <h1 className="max-w-lg text-xl text-gray-700 font medium font-noto">
            لا تتوفر أي كتب في هذا القسم
            </h1>
          </div>
      }
    </>
  )
}

export default Category