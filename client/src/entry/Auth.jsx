import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { authThunk } from '../redux/authSlice.js'
import '../components/Form.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';

export default function Auth() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const path = useLocation()

    return (
        authState.loading ? <p>Loading...</p> :
            <div className='container'>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="content">

                    <form className='form'>
                        <h1 className='txt_semi_bold'>Авторизация</h1>
                        <div className="form-content">
                            <div>
                                <input
                                    placeholder="Введите почту:"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="Введите пароль:"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button className='btn_form' type="submit" onClick={() => {
                            dispatch(authThunk({
                                email: email,
                                password: password
                            }))
                        }}>Войти</button><br></br>
                        <Link to={'/reg'}
                            className={path == "/reg" ? "location" : ''}><p style={{ marginTop: "1vh" }}>Регистрация</p></Link>

                    </form>
                    {
                        authState.error ? <p>{authState.error}</p> : <></>
                    }
                </div>
            </div>
    )
}

