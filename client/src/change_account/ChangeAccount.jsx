import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeAccount() {
  const role = useSelector((state) => state.auth.roleid)
  const id = useSelector((state) => state.auth.id)
  const path = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {
      fetch(`http://localhost:5000/profile/${id}`)
          .then(res => res.json())
          .then(json => setInfo(json))
  }, [id])

  useEffect(() => {
      setName(info[0]?.name);
      setEmail(info[0]?.email)
  }, [info])

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const data = {
              name: name,
              email: email
          }

          const response = await fetch(`http://localhost:5000/updateprofile/${id}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": 'application/json'
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              console.log("Данные успешно изменены");
              navigate('/account')
          } else {
              console.log("Ошибка при отправке данных на сервер");
          }
      } catch (error) {
          console.log("Ошибка при отправке данных ", error);
      }
  }
  return (
    <div className='container'>
      <Header visible={1} />
      <div className="content">
        <Link to={"/account"}><p className='txt_grey' style={{marginBottom: "30px"}}>К профилю</p> </Link>

        <form onSubmit={handleSubmit} className='form'>
          <div className="info_user">
            <h1 className='txt_semi_bold'>Изменить данные профиля</h1>
            <div className="userTXT">
              <h2 className='txt_semi_bold'>{name}</h2>
              <p className='txt_semi_bold'>{email}</p>
            </div>
          </div>
          <div className="form-content">
            <div>
              <input
                placeholder="Изменить ФИО:"
                type="text"
                id="fullName"
                name="fullName"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                placeholder="Изменить почту почту:"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
          </div>
          <button className='btn_form' type="submit">Изменить данные</button>
        </form>
      </div>
    </div>
  )
}

