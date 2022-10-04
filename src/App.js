import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Header, Footer} from './components';
import {Home, Contact, Register, Login, Reset} from './pages';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />

        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}  />
            <Route path="/contact" element={<Contact/>}  />

            {/* Auth */}
            <Route path="/login" element={<Login/>}  />
            <Route path="/register" element={<Register/>}  />
            <Route path="/reset" element={<Reset/>}  />

          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
