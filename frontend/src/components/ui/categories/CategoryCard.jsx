import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({category}) => {
  return (
    <Link to={`/category/${category.id}`}>
      <div className='relative flex flex-row items-center justify-center space-y-2 my-6 mx-6 mx-auto text-center p-2 px-6 w-36 h-36 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] drop-shadow-lg ease-in-out duration-500 rounded hover:border hover:-translate-y-1.5 hover:shadow-teal-500'>    
        <span className="max-w-sm text-gray-800">{category.name}</span>
      </div>
    </Link>
  )
}

export default CategoryCard