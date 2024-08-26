import React from 'react';
import Icon_MenuClose from '../assets/icons/menu_close.svg'
import Icon_MenuLogo from '../assets/icons/menu_logo.svg'
import Icon_MenuProfile from '../assets/icons/menu_profile.svg'
import Icon_MenuMyCredentials from '../assets/icons/menu_my_credentials.svg'
import Icon_MenuStatistics from '../assets/icons/menu_statistics.svg'
import Icon_MenuUsers from '../assets/icons/menu_users.svg'
import Icon_MenuCredentials from '../assets/icons/menu_credentials.svg'
import Icon_MenuCountry from '../assets/icons/menu_country.svg'
import Icon_MenuMoney from '../assets/icons/menu_money.svg'
import Icon_MenuHelp from '../assets/icons/menu_help.svg'
import Image_MenuHelpBackground from '../assets/images/menu_help_background.png'
import {ReactSVG} from "react-svg";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../app/store/userSlice.js";
import {useLogoutUserMutation} from "../app/store/userApi.js";

function Menu({openMenu, setOpenMenu, ...props}) {

    const isActiveNavlink = ({isActive}) => {
        return isActive ? "menu__item active" : "menu__item"
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [logoutUserFetch, result] = useLogoutUserMutation(undefined, {keepUnusedDataFor: 0})

    return (
        <div className={(openMenu) ? "menu active" : "menu" }>
            <div className="menu__head">
                <div className="menu__close" onClick={()=>setOpenMenu(!openMenu)}>
                    <ReactSVG src={Icon_MenuClose}/>
                </div>
                <Link to="/" className="menu__logo">
                    <span className="menu__logo_icon">
                        <ReactSVG src={Icon_MenuLogo}/>
                    </span>
                    <span className="menu__logo_text">
                        Automatic Dashboard
                    </span>
                </Link>
            </div>
            <div className="menu__blocks">
                <div className="menu__block">
                    <div className="menu__items">
                        <NavLink to="/" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuProfile}/>
                            </span>
                            <span className="menu__item_text">
                                Мой профиль
                            </span>
                        </NavLink>
                        <NavLink to="/credential" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                              <ReactSVG src={Icon_MenuMyCredentials}/>
                            </span>
                            <span className="menu__item_text">
                                Поиск телеграммов
                            </span>
                        </NavLink>
                    </div>
                </div>
                {
                    (user.role === 'Администратор') &&
                    <div className="menu__block">
                        <h3 className="menu__block_title">
                            Админ-панель
                        </h3>
                        <div className="menu__items">
                            <NavLink to="/statistics" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuStatistics} />
                            </span>
                                <span className="menu__item_text">
                                Статистика
                            </span>
                            </NavLink>
                            <NavLink to="/users" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuUsers} />
                            </span>
                                <span className="menu__item_text">
                                Пользователи
                            </span>
                            </NavLink>
                            <NavLink to="/credentials" className={isActiveNavlink}>
                           <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuCredentials} />
                            </span>
                                <span className="menu__item_text">
                                Телеграммы
                            </span>
                            </NavLink>
                            <NavLink to="/country" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuCountry} />
                            </span>
                                <span className="menu__item_text">
                                Страны
                            </span>
                            </NavLink>
                            <NavLink to="/money" className={isActiveNavlink}>
                            <span className="menu__item_icon">
                                <ReactSVG src={Icon_MenuMoney} />
                            </span>
                                <span className="menu__item_text">
                              Балансы
                          </span>
                            </NavLink>
                        </div>
                    </div>
                }
            </div>
            <div className="menu__logout button button_green" onClick={ async ()=>{await logoutUserFetch(); dispatch(logoutUser()); navigate('/login')}}>
                Выйти
            </div>
            <div className="menu__help">
                <div className="menu__help_wrapper">
                    <div className="menu__help_background">
                        <img src={Image_MenuHelpBackground} alt="Help background"/>
                    </div>
                    <div className="menu__help_icon">
                        <ReactSVG src={Icon_MenuHelp} />
                    </div>
                    <h3 className="menu__help_title">
                        Нужна помощь?
                    </h3>
                    <p className="menu__help_text">
                        Пожалуйста обратитесь к администратору
                    </p>
                    <div className="menu__help_button button button_white">
                        Связаться
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;