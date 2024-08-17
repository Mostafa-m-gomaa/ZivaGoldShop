import  { useState ,useEffect , Suspense } from 'react'
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Nav from './components/Nav';
// import Home from './components/home/Home';
import Categories from './components/Categories';
import { createContext } from 'react';
// import SubCategory from './components/SubCats';
import Product from './components/Product';
import Footer from './components/Footer';
import Cart from './components/Cart';
import toast, { Toaster } from 'react-hot-toast';
import Special from './components/Special';
import Contact from './components/Contact';
import About from './components/About';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SubCategory = React.lazy(() => import('./components/SubCats'));
const Home = React.lazy(() => import('./components/home/Home'));
const Nav = React.lazy(() => import('./components/Nav'));




export const AppContext = createContext();

export const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [lang, setLang] = useState('en')
  const [loader,setLoader] = useState(false)
  const [productIds, setProductIds] = useState(() => {
    // Retrieve the array from sessionStorage on component mount

    const savedProductIds = sessionStorage.getItem('productIds');
    return savedProductIds ? JSON.parse(savedProductIds) : [];
  });

  const [productsObj, setProductsObj] = useState(() => {
    const savedProducts = sessionStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  useEffect(() => {
    sessionStorage.setItem('productIds', JSON.stringify(productIds));
  }, [productIds]);
  useEffect(() => {
    sessionStorage.setItem('products', JSON.stringify(productsObj));
  }, [productsObj]);

  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
      // other options
    });
  }, []);


  return (
    <AppContext.Provider value={{lang ,setLang ,productIds, setProductIds ,productsObj, setProductsObj , setLoader}}>
    <>
    {loader &&     <div className="fixed bg-[#00000078] w-full h-full z-[100] flex justify-center items-center ">

<div class="spinner">
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</div>



</div>}


<div></div>
<Toaster />
     <Router>
  <Suspense fallback={<div className="fixed bg-[#00000078] w-full h-full z-[100] flex justify-center items-center ">

<div class="spinner">
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</div>



</div>}>
  <Nav />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/cat/:id" element={<Categories/>} />

         {/* <Route path="/subCat/:id" element={<SubCategory/>} /> */}
         <Route path="/subCat/:id" element={<SubCategory/>} />
         <Route path="/product/:id" element={<Product/>} />
         <Route path="/cart" element={<Cart/>} />
         <Route path="/special" element={<Special/>} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/about" element={<About/>} />

      </Routes>
      <Footer />
  </Suspense>
    </Router>
    </>
    </AppContext.Provider>
  )
}

export default App
