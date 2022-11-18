import React from 'react'
import { Link } from 'react-router-dom'

const Bar = ({book}) => {
  return (
    <>
      {
        book
        ?
          <div className="bg-slate-50 shadow p-4 px-6 rounded">
            <h2 className="max-w-md text-gray-700">
              <span className='block mb-2'>تحميل كتاب <span className='font-medium text-cyan-700'>{book.name}</span> <span className='font-sans'>pdf</span></span>
              <span className='font-medium'>
                <Link to={'/'}>الرئيسية</Link> / <Link to={`/category/${book.category}`}>{book.category_name}</Link> / <Link to={`/author/${book.author_name}-${book.author}`}>{book.author_name}</Link> / <Link to={`/book/${book.id}`}>{book.name}</Link>
              </span>
            </h2>
          </div>
        : null
      }
    </>
  )
}

export default Bar