import axios from 'axios';
import React, {useState, createContext} from 'react'

const Context = createContext({
  search  : [],
})

export function SearchContextProvider(props) {

  // eslint-disable-next-line
  const [query, setQuery] = useState([]);

  const searchForQuery = (query) => {
    axios.get(`http://127.0.0.1:8000/api/v1/search/${query}`)
      .then(res => {
        if (res.data.length > 0){
          // setBooks(res.data)
          // setSearch(query)
          // setLoading(false)
          console.log("Context Search");
        }
        else {
          // setSearch(false)
          // setLoading(false)
        }
      })
      .catch(err => {
        // setErrors(err)
        // setLoading(false)
      })
  }
  const context = {
    search : searchForQuery,
  }
  return (
    <Context.Consumer value={context}>
      {props.children}
    </Context.Consumer>
  )
}

export default Context