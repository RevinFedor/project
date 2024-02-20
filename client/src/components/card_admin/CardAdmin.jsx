import React from 'react'
import './CardAdmin.css'

export default function CardAdmin({ id,  image, date, number, addres }) {
  return (
    <div className='container_card'>
      <h4>Заявка: {id}</h4>

      <div className="info_card">
        <img className="img_card" src={`http://localhost:5000/${image}`} alt="" />
        <div className="txt_card">
          {/* <div className="row"><p className='txt_bold'>Автор:</p>{author}</div> */}
          <div className="row"><p className='txt_bold'>Дата:</p>{date}</div>
          <div className="row"><p className='txt_bold'>Адрес:</p>{addres}</div>
          <div className="row"><p className='txt_bold'>Номер автомобиля:</p>{number}</div>
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
  )
}

