import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import Routers from './Config/Routers';

function App() {
  return (
    <>
    <Header />
      <Routers />
      <Footer/>
    </>
  );
}

export default App;

//I stopped at 2:00:06
