import React, { useEffect, useState } from 'react'
import '../components/Form.css'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Reg() {
  const [Email, setEmail] = useState('')
  const [FullName, setFullName] = useState('')
  const [Pass, setPass] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')

  const regState = useSelector((state) => state.reg)
  
  const nav = useNavigate()

  useEffect(() => {
    if (regState.message) {
      nav('/auth')
    }
  }, [regState])

  return (
    regState.loading ? <p>Loading...</p> :
      <div className='container'>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="content">

          <form className='form'>
            <h1 className='txt_semi_bold'>Регистрация</h1>
            <div className="form-content">
              <div>
                <input
                  placeholder="Введите почту:"
                  type="email"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  value={Email}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Введите ваше ФИО:"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={FullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Введите пароль:"
                  type="password"
                  id="password"
                  name="password"
                  value={Pass}
                  onChange={e => setPass(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Повторите пароль:"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={ConfirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className='btn_form' type="submit" onClick={() => {
              dispatch(regThunk({
                email: Email,
                name: FullName,
                password: Pass
              }))
            }}>Зарегестрироваться</button>
          </form>
          {
            regState.error ? <p>{regState.error}</p> : <></>
          }
        </div>
      </div>
  )
}

