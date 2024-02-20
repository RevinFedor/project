import React from 'react'
import Header from '../components/header/Header'
import { Link } from 'react-router-dom'

export default function AccountAdmin() {
    const infoUser = {
        name: "Петров Петр Петрович",
        email: "petrov@gmail.com"
    }
  return (
    <div className='container'>
            <Header visible={1}/>
            <div className="content">
                <Link to={"/main"}><p className='txt_grey'> На главную</p> </Link>
                <div className="info_user">
                    <h1 className='txt_semi_bold'>Личный кабинет</h1>
                    <div className="userTXT">
                        <h2 className='txt_semi_bold'>{infoUser.name}</h2>
                        <p className='txt_semi_bold'>{infoUser.email}</p>
                        <Link to={"/changeAccount"}><h4 className='txt_grey'>Изменить данные профиля</h4></Link>
                    </div>
                </div>

            </div>
        </div>
  )
}

