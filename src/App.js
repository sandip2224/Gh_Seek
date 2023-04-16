import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Alert from './components/layout/Alert';

import Home from './components/pages/Home'
import About from './components/pages/About'
import User from './components/pages/User';
import NotFound from './components/pages/NotFound'

import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <>
          <Router>
            <ToastContainer autoClose={2500} />
            <div className='App flex flex-col justify-between h-screen'>
              <Navbar />
              <main className='container mx-auto px-3 pb-12'>
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/user/:username' element={<User />} />
                  <Route path='/notfound' element={<NotFound />} />
                  <Route path='/*' element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
