import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
import BookCard from '../components/ui/BookCard';

function Home() {
  const [books, setBooks]           = useState([]);
  const [search, setSearch]         = useState();
  // const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  let [searchParams, setSearchParams] = useSearchParams();

  let query = searchParams.get("search");

  useEffect( () => {
    if (query) {
      axios.get(`http://127.0.0.1:8000/api/v1/search/${query}`)
        .then(res => {
          if (res.data.length > 0){
            setBooks(res.data)
            setSearch(query)
            setLoading(false)
          }
          else {
            setSearch(false)
            setLoading(false)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    if(!query) {
      axios.get('http://127.0.0.1:8000/api/v1/books')
      .then(res => {
        setBooks(res.data)
        setSearch(null)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [query])

  if (loading) {
    return (
      <div className='text-right'>انتظر قليلا ...</div>
    );
  }

  return (
    <div>
      { search && 
          <div className='container mx-auto mt-12 p-4 px-6'>
            <h1 className="max-w-md font-noto text-2xl">
              نتائج البحث عن "<span className="font-bold text-green-700">{query}</span>"
            </h1>
          </div>
      }
      {
        (search === false) && 
          <div className='container mx-auto mt-12 p-4 px-6'>
            <h1 className="max-w-md font-noto text-2xl">
              لا يوجد نتائج عن "<span className="font-bold text-red-600">{query}</span>"
            </h1>
          </div>
      }
      <div className='container flex flex-col flex-wrap space-y-4 items-center justify-center mx-auto mt-12 p-4 px-6 md:flex-row'>
        {books.map( book => (
          <BookCard book={book} key={book.id}/>
        ) )}
      </div>
    </div>
    
  )
}

export default Home