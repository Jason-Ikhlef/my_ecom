import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Widgets/Navbar';
import HomePage from './Views/HomePage';
import ArticleList from './Views/ArticleList';
import ArticleSeeMore from './Views/ArticleSeemore';
import FormArticle from './Components/Form/FormArticle/CreateArticle';
import ReadUser from './Components/Form/User/ReadUser';
import CreateUser from './Components/Form/User/CreateUser';
import CreateCategory from './Components/Form/Category/CreateCategory';
import UpdateArticle from './Components/Form/FormArticle/UpdateArticle';
import UserProfilPage from './Views/UserProfilPage';
import UpdateUser from './Components/Form/User/UpdateUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' Component={HomePage} />
        <Route path='/articles' Component={ArticleList} />
        <Route path='/articles/:id' element={ <ArticleSeeMore/> }/>
        <Route path='/createArticle' Component={FormArticle} />
        <Route path='/createCategory' Component={CreateCategory} />
        <Route path='/login' Component={ReadUser} />
        <Route path='/register' Component={CreateUser} />
        <Route path='/articles/update/:id' Component={UpdateArticle} />
        <Route path='/profil' Component={UserProfilPage} />
        <Route path='/profil/update' Component={UpdateUser} />
        <Route path='/articles/seatch/:name' Component={UpdateUser} />
      </Routes>
    </Router>
  );
}

export default App;
