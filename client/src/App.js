import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Widgets/Navbar';
import HomePage from './Views/App/HomePage';
import ArticleList from './Views/Articles/ArticleList';
import ArticleSeeMore from './Views/Articles/ArticleSeemore';
import FormArticle from './Components/Form/FormArticle/CreateArticle';
import ReadUser from './Components/Form/User/ReadUser';
import CreateUser from './Components/Form/User/CreateUser';
import UpdateArticle from './Components/Form/FormArticle/UpdateArticle';
import UserProfilPage from './Views/Users/UserProfilPage';
import UpdateUser from './Components/Form/User/UpdateUser';
import AdminUser from './Views/Admin/User';
import AdminArticles from './Views/Admin/Articles';
import AdminCategories from './Views/Admin/Categories';
import Footer from './Components/Widgets/Footer';
import Cart from './Components/User/Cart';


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
        <Route path='/profil' Component={UserProfilPage} />
        <Route path='/admin/users' Component={AdminUser} />
        <Route path='/admin/articles' Component={AdminArticles} />
        <Route path='/admin/categories' Component={AdminCategories} />
        <Route path='/articles/seatch/:name' Component={UpdateUser} />
        <Route path='/cart' Component={Cart} />
        {/* <Route path='/articles/seatch/:name' Component={UpdateUser} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
