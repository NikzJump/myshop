import React from "react";
import { Link } from "react-router-dom";

function Header({login, token, setLogin, setToken}){
    async function logout(){
        const api_url = await fetch("http://127.0.0.1:8000/logout",{
            "Authorization":`Bearer ${token}`
        })
        setLogin(false)
        setToken('')
    }
    return(
        <div>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to="/" className="d-flex align-items-center text-dark text-decoration-none border-bottom">
                        <h5 className="fs-4">Набор цветных костылей</h5>
                    </Link>
                                
                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {login ?<div>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/orders">Мои заказы</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/Cart">Корзина</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/" onClick={()=>{logout()}}>Выход</Link>
                        </div> :<div>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/Reg">Регистрация</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to="/Login">Авторизация</Link>                  
                    </div>}
                    </nav>
                </div>


            </header>
        </div>
    )
}

export default Header