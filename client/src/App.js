import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Widgets/Navbar';
import Home_page from './Views/HomePage';
import Article_list from './Views/ArticleList';
import Article_seemore from './Views/ArticleSeemore';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' Component={Home_page} />
        <Route path='/articles' Component={Article_list} />
        <Route path='/articles/:id' element={ <Article_seemore/> }/>
      </Routes>
    </Router>
  );
}

export default App;
