import React, { useContext } from 'react'
import {FiEdit3} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import {MdReportGmailerrorred} from 'react-icons/md'
import AuthContext from '../../../context/AuthContext'
import axios from 'axios'
let moment = require('moment')

const CommentCard = ({comment, filterMan}) => {

  const auth = useContext(AuthContext)
  const date = moment(comment.created_on).format('hh:mm:ss, YYYY/MM/DD')

  const deleteComment = () => {
    axios.delete(`http://127.0.0.1:8000/api/v1/comment/opt/${comment.id}`)
      .then(res => {
        filterMan(comment)
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <div id="comment" className="flex flex-row justify-between items-center shadow-lg rounded-lg p-6 drop-shadow px-6 bg-slate-50">
        <div className="flex flex-row">
          <div>
            <img className='rounded-full ml-6 shadow' src={`https://www.kotobati.com/themes/custom/ktobati/assets/images/avatar.svg`} width={70} alt='Author'/>
          </div>
          <div className='flex flex-col space-y-2'>
            <h1 className="max-w-md text-lg text-gray-800 font-medium font-sans capitalize">
              {
                auth.user && comment.username === auth.user.username 
                  ? 'أنت'
                  : comment.username
              } 
            </h1>
            <p className="max-w-6xl mt-4 text-sm text-gray-700">{comment.body}</p>
            <div className="max-w-md text-sm text-gray-600">
              <small>{date}</small>
            </div>
          </div>
        </div>
        {auth.user &&
          auth.user.user_id === comment.user 
          ?
            <div id="option" className="flex-flex-col items-center space-y-6">
              <div><span className="flex items-center max-w-md text-gray-700 font-medium cursor-pointer	hover:text-green-700">{<FiEdit3 />} تعديل</span></div>
              <div><span className="flex items-center max-w-md text-gray-700 font-medium cursor-pointer	hover:text-red-700" onClick={() => deleteComment()}>{<RiDeleteBin7Line />} حذف</span></div>
            </div>
          : 
            <div><span className="flex items-center max-w-md text-gray-700 font-medium cursor-pointer hover:text-gray-900">{<MdReportGmailerrorred />} ابلاغ</span></div>
        }
      </div>
    </>
  )
}

export default CommentCard
