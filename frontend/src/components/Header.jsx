import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';

function Header() {

  const auth = useContext(AuthContext)

  return (
    <header>
      <nav className="container relative flex flex-col items-center justify-between mx-auto mt-2 p-4 px-6 space-y-6 md:flex-row md:space-y-0 shadow-md rounded font-noto">
        <div>
          {
            auth.user
              ?
              <Link to={'/logout'} className='max-w-md font-noto p-2 px-2 text-gray-700 text-lg ease-linear duration-100 hover:text-red-600'>الخروج</Link>
              :
              <div className='flex flex-row items-center justify-center space-x-2'>
                <Link to={'/register'} className='max-w-md font-noto p-2 px-2 text-gray-700 font-medium'>حساب جديد</Link>
                <Link to={'/login'} className='max-w-md font-noto p-2 px-2 text-gray-700 font-medium text-green-700'>تسجيل الدخول</Link>
              </div>
          }
        </div>
        <div id="links">
          <ul className="flex flex-col space-x-6 items-center justify-between list-none md:flex-row">
            <li className="inline"><Link to="/favorites" className="max-w-md font-noto p-2 px-2 text-gray-700 text-lg text-gray-700 text-lg ease-linear duration-100 hover:text-xl">المفضلة</Link></li>
            <li className="inline"><Link to="/store" className="max-w-md font-noto p-2 px-2 text-gray-700 text-lg ease-linear duration-100 hover:text-xl">المتجر</Link></li>
            <li className="inline"><Link to="/authors" className="max-w-md font-noto p-2 px-2 text-gray-700 text-lg ease-linear duration-100 hover:text-xl">المؤلفون</Link></li>
            <li className="inline"><Link to="/categories" className="max-w-md font-noto p-2 px-2 text-gray-700 text-lg ease-linear duration-100 hover:text-xl">الأقسام</Link></li>
            <li className="inline"><Link to='/' className="max-w-md font-noto p-2 px-2 text-gray-700 text-lg ease-linear duration-100 hover:text-xl">الرئيسية</Link></li>
          </ul>
        </div>
        <div>
          <form className="flex flex-row-reverse items-center mb-12 md:mb-0">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="simple-search" className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="البحث عن كتاب أو مؤلف" required name='search'/>
            </div>
            <button type="submit" className="p-2.5 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </nav>
    </header>
  )
}

export default Header