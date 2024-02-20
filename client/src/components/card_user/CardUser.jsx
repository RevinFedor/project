import React from 'react'
import './CardUser.css'

export default function CardUser({ id, image, date, numberCar, addres, comment, status }) {
  return (
    <div className='container_card1'>
      <h4>Заявка: {id}</h4>

      <div className="info_card1">
        <img className="img_card1" src={`http://localhost:5000/` + `${image}`} alt="" />
        <div className="txt_card1">
          <div className="row"><p className='txt_bold'>Дата:</p>{date}</div>
          <div className="row"><p className='txt_bold'>Адрес:</p>{addres}</div>
          <div className="row"><p className='txt_bold'>Номер автомобиля:</p>{numberCar}</div>
          {/* <div className="row comment1"><span className='txt_bold'>Комментарий: </span>{comment}</div> */}
        </div>
      </div>
      <div className="row nowrap1"><p className='txt_bold'>Статус:</p>{status == 1 ? 'В рассмотрении' : status == 2 ? 'Принято' : 'Отклонено'}</div>

    </div>
  )
}

