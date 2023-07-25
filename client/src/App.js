import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Widgets/Navbar';
import HomePage from './Views/HomePage';
import ArticleList from './Views/ArticleList';
import ArticleSeeMore from './Views/ArticleSeemore';
import FormArticle from './Components/Form/FormArticle/CreateArticle';
import ReadUser from './Components/Form/User/ReadUser';
import CreateUser from './Components/Form/User/CreateUser';
import UpdateArticle from './Components/Form/FormArticle/UpdateArticle';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' Component={HomePage} />
        <Route path='/articles' Component={ArticleList} />
        <Route path='/articles/:id' element={ <ArticleSeeMore/> }/>
        <Route path='/createArticle' Component={FormArticle} />
        <Route path='/login' Component={ReadUser} />
        <Route path='/register' Component={CreateUser} />
        <Route path='/articles/update/:id' Component={UpdateArticle} />
      </Routes>
    </Router>
  );
}

export default App;
