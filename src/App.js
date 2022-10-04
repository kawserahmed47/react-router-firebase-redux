import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Header, Footer} from './components';
import {Home, Contact, Register, Login, Reset} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
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
