import React from 'react'
import {Link} from 'react-router-dom';
function BookCard(props) {
  return (
    <div className='flex flex-col relative w-full items-center space-y-2 my-6 mx-6 mx-auto text-center p-2 px-6 w-44 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] drop-shadow-lg ease-in-out duration-500 rounded hover:border hover:-translate-y-1.5 hover:shadow-teal-500' key={props.book.id}>
      <Link to={`/book/${props.book.id}`} className='flex flex-col space-y-2'>
        <div>
          <img className='drop-shadow-md rounded-md' src={`http://127.0.0.1:8000${props.book.cover}`} width={120} alt="" />
        </div>
        <span className="max-w-sm text-gray-800">{props.book.name}</span>
      </Link>
      <span className="max-w-sm text-gray-500">{props.book.author_name}</span>
    </div>
  )
}

export default BookCard