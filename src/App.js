import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbars from './components/navbars';
import Footer from './components/footer';
import About from './components/about';
import Contact from './components/contact';
import Cart from './components/cart';
import MensPerfume from './components/mensPerfume';
import Rules from './components/ruls';
import Favorites from './components/favorites';
import WomanPerfume from './components/womenPerfume';
import SharedPerfume from './components/sharedPerfume';
import DiscountsProducts from './components/discounts';
import Main from './components/main';
import Login from './components/loginUser/login';
import Verify from './components/loginUser/verify';
import Blogs from './components/blog';
import UserPanel from './components/userProfile/userPanel';
import { CartProvider } from './context/conCart'; 
import { FavoritesProvider } from './context/conFavorites';
import ProtectedRoute from './components/RestrictUserAccess/productsRot'; 
import AdminVerify from './components/loginAdmin/adminVerify';
import PanelAdmin from './components/panelAdmin/adminPanel';
import ListsOrderes from './components/userProfile/listOrders';
import ViewUsers from './components/userProfile/views';
import AddressList from './components/userProfile/address';
function App() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [name, setNameLocal] = useState(() => localStorage.getItem("name") || '');
  const [lastname, setLastNameLocal] = useState(() => localStorage.getItem("lastname") || '');
  const [isLogin, setIsLogin] = useState(!!(name && lastname)); 
  const [fullName, setFulName] = useState(() => localStorage.getItem("fullName") || ''); 
  const [isLoginAdmin, setIsLoginAdmin] = useState(false); // یا هر وضعیت اولیه دیگر

  const [userImg, setUserImg] = useState("");


  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <MainRoutes 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            name={name} 
            lastname={lastname} 
            isLogin={isLogin} 
            setIsFirstTime={setIsFirstTime}
            setLastNameLocal={setLastNameLocal}
            setNameLocal={setNameLocal}
            setIsLogin={setIsLogin}
            fullName={fullName}
            setFulName={setFulName}
            isLoginAdmin={isLoginAdmin}
            setIsLoginAdmin={setIsLoginAdmin}
            userImg={userImg}
            setUserImg={setUserImg}
         
          />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
}

function MainRoutes({ searchTerm, setSearchTerm, name, lastname, isLogin, isFirstTime, setIsFirstTime, setLastNameLocal, setNameLocal, setIsLogin, fullName, setFulName, userImg, setUserImg,isLoginAdmin,setIsLoginAdmin}) {
  const location = useLocation();
  const noNavbarFooterRoutes = ['/adminPanel'];

  return (
    <div className="App">
      {!noNavbarFooterRoutes.includes(location.pathname) && (
        <Navbars setSearchTerm={setSearchTerm} name={name} lastname={lastname} setNameLocal={setNameLocal} setLastNameLocal={setLastNameLocal}/>
      )}
      <Routes>
        <Route path="/" element={<Main searchTerm={searchTerm} isLogin={isLogin} />} />
        <Route path="/main" element={<Main searchTerm={searchTerm} isLogin={isLogin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedRoute><Cart searchTerm={searchTerm} /></ProtectedRoute>} />
        <Route path="/ruls" element={<Rules />} />
        <Route path="/mensPerfume" element={<MensPerfume searchTerm={searchTerm} />} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites searchTerm={searchTerm} /></ProtectedRoute>} />
        <Route path="/womanPerfume" element={<WomanPerfume searchTerm={searchTerm} />} />
        <Route path="/sharedPerfume" element={<SharedPerfume searchTerm={searchTerm} />} />
        <Route path="/discounts" element={<DiscountsProducts searchTerm={searchTerm} />} />
        <Route path="/blog" element={<Blogs searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login setIsFirstTime={setIsFirstTime} isFirstTime={isFirstTime} 
         setLastNameLocal={setLastNameLocal} setNameLocal={setNameLocal} setIsLogin={setIsLogin} />} />
        <Route path="/verify" element={<Verify setIsFirstTime={setIsFirstTime} isFirstTime={isFirstTime} setLastNameLocal={setLastNameLocal} setNameLocal={setNameLocal} setIsLogin={setIsLogin} />} />
        <Route path="/userPanel" element={<ProtectedRoute><UserPanel searchTerm={searchTerm} name={name} lastname={lastname} setNameLocal={setNameLocal} setLastNameLocal={setLastNameLocal} userImg={userImg} setUserImg={setUserImg} /></ProtectedRoute>} />
        <Route path="/listOrders" element={<ProtectedRoute><ListsOrderes /></ProtectedRoute>} />
        <Route path="/viewUsers" element={<ProtectedRoute><ViewUsers name={name} lastname={lastname} setNameLocal={setNameLocal} setLastNameLocal={setLastNameLocal} userImg={userImg} setUserImg={setUserImg} /></ProtectedRoute>} />
        <Route path="/addressList" element={
        <ProtectedRoute>
          <AddressList 
          name={name} 
          lastname={lastname} 
          setNameLocal={setNameLocal} 
          setLastNameLocal={setLastNameLocal}
           />
          </ProtectedRoute>} />
        <Route path="/adminVerify"isAdmin={true} element={<AdminVerify fullName={fullName} setFulName={setFulName} />} />
       <Route path="/adminPanel" element={
         <PanelAdmin fullName={fullName}  setFulName={setFulName} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        } />
      </Routes>
      {!noNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
