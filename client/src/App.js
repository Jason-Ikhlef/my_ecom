import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Widgets/Navbar';
import HomePage from './Views/HomePage';
import ArticleList from './Views/ArticleList';
import ArticleSeeMore from './Views/ArticleSeemore';
import FormArticle from './Components/Form/FormArticle';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' Component={HomePage} />
        <Route path='/articles' Component={ArticleList} />
        <Route path='/articles/:id' element={ <ArticleSeeMore/> }/>
        <Route path='/form' Component={FormArticle} />
      </Routes>
    </Router>
  );
}

export default App;
