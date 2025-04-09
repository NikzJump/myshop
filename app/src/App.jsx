import react from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Reg from "./components/Reg";

function App() {
  const [login, setLogin] = react.useState(false)
  const [token, setToken] = react.useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Header login = {login} setLogin={setLogin} token={token} setToken={setToken}/>
        <Routes>
          <Route element={<Home login = {login} token={token}/>} path="/" />
          <Route element={<Login login = {login} setLogin={setLogin} token = {token} setToken = {setToken}/>} path="/login"/>
          <Route element={<Reg login = {login} setLogin={setLogin}/>} path="/reg"/>
          <Route element={<Cart token={token}/>} path="/cart"/>
          <Route element={<Orders token={token}/>} path="/orders"/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
