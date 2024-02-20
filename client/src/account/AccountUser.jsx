import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import './Account.css'
import { Link, useLocation } from 'react-router-dom'
import img from '../assets/1.jpg'
import CardUser from '../components/card_user/CardUser'
import { useDispatch, useSelector } from 'react-redux'

export default function Account() {
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()

    const [info, setInfo] = useState([])
    const [requests, setRequests] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://localhost:5000/profile/${id}`)
            .then(res => res.json())
            .then(json => setInfo(json))
    }, [id])

    useEffect(() => {
        fetch(`http://localhost:5000/requests/${id}`)
            .then(res => res.json())
            .then(json => setRequests(json))
    }, [id])

    console.log(id);
   
    return (
        <div className='container'>
            <Header visible={1}/>
            <div className="content">
                <Link to={"/main"}><p className='txt_grey'> На главную</p> </Link>
                <div className="info_user">
                    <h1 className='txt_semi_bold'>Личный кабинет</h1>
                    <div className="userTXT">
                        <h2 className='txt_semi_bold'>{info[0]?.name}</h2>
                        <p className='txt_semi_bold'>{info[0]?.email}</p>
                        <Link to={"/changeAccount"}><h4 className='txt_grey'>Изменить данные профиля</h4></Link>
                    </div>
                </div>

                <h2>Ваши заявки:</h2>
                <div className="main_account">
                    {
                        requests.map((e) => {
                            return (
                                <CardUser id={e.id} image={e.image} date={e.date} numberCar={e.numbercar} addres={e.addres} comment={e.comment} status={e.statusid} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

