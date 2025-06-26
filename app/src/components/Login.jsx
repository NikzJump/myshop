import React from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

function Login({login, setLogin, token, setToken}){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()
    const [error, setError] = React.useState(false)
    const data ={
        "email":email,
        "password":password,
}
    async function postReg(event){
        event.preventDefault()
        const api_url = await fetch("http://127.0.0.1:8000/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":`application/json`
            }
        })
        const json = await api_url.json()
        if(json.data){
            setLogin(true)
            setToken(json.data.user_token)
            console.log(json.data.user_token);
            navigate('/')
        }        
        else{        
            setError(true)
            console.log("!!!!!!!!!", error);   
        }
    }
    return(
        <div>
            <main>
            <h1 className="pricing-header p-3 pb-md-4 mx-auto text-center">Вход</h1>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                    <div className="col">
                        <div className="row">
                            <form onSubmit={postReg}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <button className="w-100 btn btn-lg btn-success mb-3" type="submit">Войти</button>
                            </form>
                            <p>{error ? <b>Неверный адрес электронной почты или пароль</b>: ""}</p>
                            <Link to={"/"} className="w-100 btn btn-lg btn-outline-secondary">Назад</Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login