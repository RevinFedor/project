import React from 'react'
import logo from '../../assets/logo.svg'
import user from '../../assets/user.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/authSlice'

const Header = ({visible}) => {
    const dispatch = useDispatch()
    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
            {
                visible ?
                    <button onClick={() => {
                        dispatch(logOut())
                    }}><h2 className=' txt_semi_bold'>Выйти</h2></button>
                    :
                    <Link to={"/account"}> <img className="user" src={user} alt="logo" /> </Link>
            }
        </div>
    )
}

export default Header