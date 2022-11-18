import axios from 'axios';
import React, {useEffect, useState} from 'react'
import CategoryCard from '../components/ui/categories/CategoryCard';

function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/categories')
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='container flex flex-col flex-wrap space-y-4 items-center justify-center mx-auto mt-12 p-4 px-6 md:flex-row'>
      {categories.map(category => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  )
}

export default Categories