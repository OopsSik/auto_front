import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Icon_User from '../assets/icons/header_user.svg'
import {ReactSVG} from "react-svg";
import {useGetMoneyQuery} from "../app/store/settingApi.js";

function Header({openMenu, setOpenMenu, ...props}) {

    const [setting, setSetting] = useState({color: 'green', width: 100})
    const {nickname, money} = useSelector(state => state.user)
    const {data, isSuccess} = useGetMoneyQuery()

    useEffect(()=>{
        if(data?.moneys && isSuccess){
            if(money >= 7){
                setSetting({color: 'green', width: (parseInt(money)/parseInt(data.moneys)*100)})
            } else if(money < 7 && money >= 4){
                setSetting({color: 'yellow', width: (parseInt(money)/parseInt(data.moneys)*100)})
            }else{
                setSetting({color: 'red', width: (parseInt(money)/parseInt(data.moneys)*100)})
            }
        }
    }, [data, isSuccess, setSetting, money])

    return (
        <div className="header">
            <div className="breadcrumb">
                <h2 className="breadcrumb__title">
                    Профиль
                </h2>
            </div>
            <div className="welcome">
                <h3 className="welcome__title">
                    Добро пожаловать, {nickname}
                </h3>
            </div>
            <div className="user">
                <div className="user__image">
                    <ReactSVG src={Icon_User} />
                </div>
                <div className="user__information">
                    <h3
                        className={'user__title ' + setting.color}>
                        Мой баланс: <span>{money}</span>
                    </h3>
                    <div className={'user__bar ' + setting.color}>
                        <span style={{width: `${setting.width}%`}}></span>
                    </div>
                </div>
            </div>
            <div className={(openMenu) ? "burger open" : "burger"} onClick={()=>setOpenMenu(!openMenu)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Header;