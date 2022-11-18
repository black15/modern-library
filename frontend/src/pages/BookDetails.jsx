import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import {Link, useParams} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CommentForm from '../components/ui/comments/CommentForm';
import CommentCard from '../components/ui/comments/CommentCard';
import Bar from '../components/ui/Bar';

function BookDetails() {
  
  const {bookId} = useParams();
  const auth = useContext(AuthContext)
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`)
      .then(res => {
        setBook(res.data)
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`http://127.0.0.1:8000/api/v1/comments/${bookId}`)
      .then(res => {
        setComments(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },[bookId])

  const handleState = (comment) => {
    setComments([...comments, comment])
  }
  const handleDelete = (comment) => {
    setComments(comments.filter(item => item.id !== comment.id))
  }


  return (
    <div>
      {/* Book Page Container */}
      <div className='container flex flex-col font-noto mx-auto mt-12 mb-12 p-4 px-6 space-y-12'>
        <Bar book={book}/>
        {/* Book Details */}
        <div className="flex flex-col mt-6 p-6 px-12 bg-slate-50 rounded drop-shadow-md shadow-xl md:flex-row md:space-x-6">
          <div className='rounded-md drop-shadow-2xl ml-24' id="cover">
            <img className='border border-gray-400 p-1 rounded-md' src={`http://127.0.0.1:8000${book.cover}`} width={200} alt="Cover" />
          </div>
          <div className="flex flex-col space-y-24">
            <div className="flex flex-col space-y-6 mt-6">
              <h1 className="max-w-md text-gray-900 text-2xl font-medium font-noto">{book.name}</h1>
              <h3 className="max-w-md text-cyan-700"><span className='text-gray-700'>المؤلف : </span><Link to={`/author/${book.author_name}-${book.author}`}>{book.author_name}</Link></h3>
              <h3 className="max-w-md text-cyan-700"><span className='text-gray-700'>القسم : </span><Link to={`/category/${book.category}`}>{book.category_name}</Link></h3>
              <h3 className="max-w-md text-cyan-700"><span className='text-gray-700'>تاريخ النشر : </span>{book.added_date}</h3>
              <div className="flex flex-row items-center -mx-6">
                <div className="flex flex-col items-center space-y-2 border-l-2 border-gray-700 px-6 h-8 mt-6">
                  <span className="max-w-md text-gray-700">الصفحات</span>
                  <span className="max-w-md text-gray-700">{book.pages}</span>
                </div>
                <div className="flex flex-col items-center space-y-2 border-l-2 border-gray-700 px-6 h-8 mt-6">
                  <span className="max-w-md text-gray-700">اللغة</span>
                  <span className="max-w-md text-gray-700">{book.language}</span>
                </div>
                <div className="flex flex-col items-center space-y-2 border-l-2 border-gray-700 px-6 h-8 mt-6">
                  <span className="max-w-md text-gray-700">تاريخ النشر</span>
                  <span className="max-w-md text-gray-700">{book.added_date}</span>
                </div>
                <div className="flex flex-col items-center space-y-2 px-6 h-8 mt-6">
                  <span className="max-w-md text-gray-700">الصفحات</span>
                  <span className="max-w-md text-gray-700">{book.pages}</span>
                </div>
              </div>
            </div>
            <div id="description">
              <h1 className="max-w-md text-gray-900 text-2xl font-medium font-noto">وصف الكتاب</h1>
              <p className="max-w-2xl text-gray-700 font-noto my-4">{book.descreption}</p>
            </div>
          </div>
        </div>

        {/* Read and Download */}
        <div className="flex flex-row justify-center p-2 px-6 font-noto">
          <div>
            <a href="d" className="max-w-md text-xl text-white p-2 px-6 rounded bg-red-600 ml-6">تحميل</a>
          </div>
          <div>
            <a href="d" className="max-w-md text-xl text-white p-2 px-6 rounded bg-cyan-700">قراءة</a>
          </div>
        </div>
        {/* Comments Section */}
        <div className="flex flex-col space-y-6 font-medium xl:w-[1100px] mx-auto">
          {
            comments.length === 0 &&
            <React.Fragment>
              <h1 className="max-w-md text-2xl">لا يوجد اي تقييمات حاليا</h1>
            </React.Fragment>
          }
          {auth.user 
            ? 
              <CommentForm book_id={bookId} user={auth.user} reRender={handleState} />
            : 
              <p className="max-w-xl text-gray-700">
                لاضافة تقييم يجب عليك <Link to={"/login"} className='font-medium text-cyan-800 underline'> تسجيل الدخول</Link>
              </p>
          }
          {comments.length > 0 ? 
          <React.Fragment>
            <h1 className="max-w-md text-2xl">التعليقات و التقييمات</h1>
            <div className="flex flex-col space-y-4">
              {/* Comment Section */}
              {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} filterMan={handleDelete} />
              ))}
            </div>
          </React.Fragment> : null}
        </div>
      </div>
    </div>
  )
}

export default BookDetails