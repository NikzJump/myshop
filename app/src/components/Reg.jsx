import React from "react";
import { Link, Route, Routes, json, useNavigate } from 'react-router-dom';

function Reg({login, setLogin}){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fio, setFio] = React.useState('')
    const navigate = useNavigate()
    const [error, setError] = React.useState(false)
    const data ={
        "email":email,
        "password":password,
        "nik":fio
}
    async function postReg(event){
        event.preventDefault()
        const api_url = await fetch("http://127.0.0.1:8000/signup", {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":`application/json`
            }
        })
        const json = api_url.json()
        if(api_url.ok){
            navigate('/Login')
        }        
        else{
            setError(true)
        }
    }
    return(
        <div>
            <main>
            <h1 className="pricing-header p-3 pb-md-4 mx-auto text-center">Регистрация</h1>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                    <div className="col">
                        <div className="row">
                            <form onSubmit={postReg}>
                                <h1 className="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingFio" placeholder="ФИО" onChange={(e) => {setFio(e.target.value)}}/>
                                    <label for="floatingFio">ФИО</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <button className="w-100 btn btn-lg btn-success mb-3" type="submit">Зарегистрироваться</button>

                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Reg