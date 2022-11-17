import axios from 'axios'
import React from 'react'

const CommentForm = (props) => {  

  const hundleForm = (e) => {
    e.preventDefault()
    axios.post(`http://127.0.0.1:8000/api/v1/comment/${props.book_id}`, 
      {
        'book': props.book_id,
        'user': props.user.user_id,
        'body': e.target.comment.value
      }
    )
      .then(res => {
        props.reRender(
          {
            'book': props.book_id,
            'user': props.user.user_id,
            'body': e.target.comment.value
          }
        )
        e.target.comment.value = ''
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" method='post' onSubmit={hundleForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">+ اضافة تعليق</h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="comment" placeholder='أدخل تعليقك ...' required></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div className="-mr-1">
              <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='نشر' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CommentForm