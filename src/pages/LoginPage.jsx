import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import Footer from "../components/Footer.jsx";
import Image_Background from "../assets/images/login_page_background.png"
import {useLoginUserMutation} from "../app/store/userApi.js";
import {useDispatch} from "react-redux";
import {signUser} from "../app/store/userSlice.js";
import {useAuth} from "../app/hooks/index.js";
import {Navigate} from "react-router-dom";
import {openPopup} from "../app/store/popupSlice.js";
import PopupWrapper from "../components/popups/PopupWrapper.jsx";

function LoginPage({titlePage, ...props}) {

    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm({
        mode: 'onBlur'
    })
    const dispatch = useDispatch()
    const {isLoading, isAuth} = useAuth()
    const [loginUser, {data, error, isError}] = useLoginUserMutation()
    const handleOnSubmit = async (values) => {
        await loginUser(values)
    }

    useEffect(()=>{
        if(data){
            dispatch(signUser(data))
            reset()
        }
        if(error && isError){
            dispatch(openPopup({type: 'error', text: 'Возможно логин или пароль неправильный'}))
        }
    }, [data, dispatch, error, isError])

    if(!isLoading && isAuth){
        return <Navigate to='/' />
    }

    if(!isLoading && !isAuth){
        return (
            <div className="app-wrapper">
                <title>{titlePage}</title>
                <div className="app-wrapper__container app-wrapper__container_reg">
                    <div className="reg">
                        <div className="reg__wrapper">
                            <div className="reg__background">
                                <img src={Image_Background} alt="Background"/>
                            </div>
                            <div className="reg__content">
                                <h1 className="reg__title">
                                    Добро пожаловать
                                </h1>
                                <p className="reg__text">
                                    Введите Ваш логин и пароль для входа
                                </p>
                            </div>
                            <div className="reg__form" onSubmit={handleSubmit(handleOnSubmit)}>
                                <form className="form" >
                                    <div className="form__body">
                                        <label className="form__label">
                                            <span className="form__title">Логин</span>
                                            <input
                                                type="text"
                                                placeholder="Введите логин"
                                                {...register('username', {required: true})}
                                                className={(errors.username || error) && 'error'}
                                            />
                                            {
                                                (errors.username || error) &&
                                                <span className="form__error">Это поле являеться обязательным</span>
                                            }
                                        </label>
                                        <label className="form__label">
                                            <span className="form__title">Пароль</span>
                                            <input
                                                type="password"
                                                placeholder="Введите пароль"
                                                {...register('password', {required: true})}
                                                className={(errors.password || error) && 'error'}
                                            />
                                            {
                                                (errors.password || error) &&
                                                <span className="form__error">Это поле являеться обязательным</span>
                                            }
                                        </label>
                                    </div>
                                    <div className="form__footer">
                                        <button className="button button_green form__button">Войти</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                <PopupWrapper />
            </div>
        );
    }

}

export default LoginPage;