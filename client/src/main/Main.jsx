import React, { useState } from 'react'
import Header from '../components/header/Header'
import './Main.css'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function Main() {
    const [date, setDate] = useState('')
    const [addres, setAddres] = useState('')
    const [numberCar, setNumberCar] = useState('')
    const [image, setImage] = useState(undefined)

    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('addres', addres);
            formData.append('numberCar', numberCar);
            formData.append('image', image);
            formData.append('userId', id)

            const response = await fetch('http://localhost:5000/newrequest', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Данные успешно отправлены на сервер");

                setDate('')
                setAddres('')
                setNumberCar('')
                setImage(undefined)
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    return (
        <div className='container'>
            <Header visible={false} />
            <div className="content">
                <div className="txt_main">
                    <h1 className='txt_semi_bold'>Оставить заявку</h1>
                    <p>Мы — ваш надежный помощник в борьбе за соблюдение правил дорожного движения. Здесь вы можете быстро и легко оставить заявку на нарушение Правил Дорожного Движения (ПДД) и помочь сделать наши дороги безопаснее для всех. </p>
                    <p> Наш сервис позволяет жителям сообщать о нарушениях, таких как превышение скорости, проезд на красный свет, неправильная парковка и многое другое. Просто заполните удобную форму заявки на нашем сайте, приложите необходимые доказательства (например, фотографии или видео), и мы обязательно рассмотрим вашу жалобу. </p>
                    <p> Присоединяйтесь к нам на ШтрафамДа и вместе мы сделаем наши дороги лучше!</p>
                </div>

                <form className='form_main' onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="row_main_form">
                            <div>
                                <input placeholder='Дата' type="date" id="date" name="date" value={date} onChange={ e=> setDate(e.target.value)} required />
                            </div>
                            <div>
                                <input placeholder="Номер транспортного средства" type="text" id="number" name="number" value={numberCar} onChange={e=> setNumberCar(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <input placeholder="Адерс (населеный пункт, улица)" type="text" id="number" name="addres" value={addres} onChange={e=> setAddres(e.target.value)} required />
                        </div>

                        {/* <div>
                            <textarea placeholder="Комментарий" id="comment" name="comment" value={formData.comment} onChange={handleChange} rows="4" cols="50"></textarea>
                        </div> */}
                        <div>
                            <input placeholder="Выбрать файлы" type="file" id="photos" name="photos" accept="image/*" multiple onChange={handleFileChange} />
                            
                        </div>
                    </div>
                        <button className='btn_form' type="submit">Отправить</button>
                </form>

            </div>
        </div>
    )
}

