import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import './Admin.css'
import CardAdmin from '../components/card_admin/CardAdmin'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Admin() {
    const [requests, setRequests] = useState([])

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)

    const path = useLocation()

    const True = async (id) => {
        try {
            const data = {
                id: id,
                status: 2
            }
            const response = await fetch(`http://localhost:5000/adminrequests`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Данные успешно изменены");
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    const False = async (id) => {
        try {
            const data = {
                id: id,
                status: 3
            }
            const response = await fetch(`http://localhost:5000/adminrequests`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Данные успешно изменены");
                
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    const getInfo = () => {
        fetch(`http://localhost:5000/admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => setRequests(json))
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => setRequests(json))
    }, [token])
    return (
        <div className='container'>
            <Header />
            <div className="content">
                <h1 className='txt_semi_bold head'>Заявки на нарушения ПДД</h1>
                <div className="main_admin">
                    {
                        requests.map(e => (
                            <div className='container_card' key={e.id}>
                                <h4>Заявка: {e.id}</h4>

                                <div className="info_card">
                                    <img className="img_card" src={`http://localhost:5000/${e.image}`} alt="" />
                                    <div className="txt_card">
                                        {/* <div className="row"><p className='txt_bold'>Автор:</p>{author}</div> */}
                                        <div className="row"><p className='txt_bold'>Дата:</p>{e.date}</div>
                                        <div className="row"><p className='txt_bold'>Адрес:</p>{e.addres}</div>
                                        <div className="row"><p className='txt_bold'>Номер автомобиля:</p>{e.numbercar}</div>
                                        {/* <div ><span className='txt_bold'>Комментарий: </span>{comment}</div> */}

                                        <div className="btn_admin txt_white">
                                            <button className='btn_admin_no txt_semi_bold' onClick={() => {
                                                False(e.id);
                                                getInfo()
                                            }}>Отклонить</button>
                                            <button className='btn_admin_yes txt_semi_bold' onClick={() => {
                                                True(e.id);
                                                getInfo()
                                            }}>Принять</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Admin

