import React, {useState, useEffect} from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Header from './Components/Header';
import Shelves from './Components/Shelves';
import * as BooksAPI from './BooksAPI'; 
import Book from './Components/Book';
import { BrowserRouter as Router ,  Routes,
  Route, Link} from 'react-router-dom';
  import {useDebounce} from 'use-debounce';
const BooksApp = ()=> {
  
  const [mapidbook, setmapidbook]=useState(new Map());
  const [books,setBooks]=useState([]);
  const [searchBooks, setSearchBooks]= useState([]);
  const [query, setQuery] = useState("");
  const [combine,setCombine]=useState([]);
  const [value]=useDebounce(query,500)
  
 
  useEffect(()=>{
    BooksAPI.getAll().then(data=> {
      
      setBooks(data)
      setmapidbook(createMapOfBooks(data))
    }
      );
  },[])
  useEffect(()=>{
    let Active= true
    if(value){
    BooksAPI.search(value).then(data => {
     if(data.error) {
      setSearchBooks([])
  }else {
    if(Active){
    setSearchBooks(data);}
  }
})
}
return () =>{
  Active= false;
  setSearchBooks([]);
}
  },[value])

  useEffect(() => {

    const combined = searchBooks.map(book => {
      if (mapidbook.has(book.id)) {
        return mapidbook.get(book.id);
      } else {
        return book;
      }
    })
    setCombine(combined);
  }, [searchBooks])

const createMapOfBooks =(books)=>{
  const map = new Map();
  books.map(book => map.set(book.id, book));
  return map;
}
 
const updatebookshelf = (ele, to) => {
     const updatebook = books.map(b => {
      if (b.id === ele.id) {
        ele.shelf = to;
        return ele;} return b; })
        if(!mapidbook.has(ele.id)){

          ele.shelf =to;
          updatebook.push(ele)
        }
setBooks(updatebook);
BooksAPI.update(ele,to)
 };
  
  
  return (
    
      <div className="app">
      <Router>
      <Routes>

         
        
              <Route path="search" element={ <div className="search-books">
            <div className="search-books-bar">
              <Link to ="/"> <button className="close-search" >Close </button></Link>
              <div className="search-books-input-wrapper">  
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=> setQuery(e.target.value) }/>
              </div></div>
            <div className="search-books-results">
              <ol className="books-grid">
              {combine.map(ele => (
                        <li key={ele.id}> <Book book={ele} updatebookshelf={updatebookshelf} /></li>))}
      
              </ol> </div>  </div>} />


              <Route path="/" element={ <div className="list-books">
           <Header />
            <div className="list-books-content">
           
<Shelves books={books} updatebookshelf={updatebookshelf}/>

            </div>
            <div className="open-search">
             <Link to="search">  <button  >Add a book </button></Link>
            </div>
          </div>} />
         
          </Routes>
          </Router>
      </div>
    )
  
}

export default BooksApp
