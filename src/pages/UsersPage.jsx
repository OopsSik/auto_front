import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import Mark from "../components/Mark.jsx";
import {useGetRolesQuery} from "../app/store/roleApi.js";
import {useRegistrationUserMutation} from "../app/store/userApi.js";
import TablesUsers from "../components/tables/TablesUsers.jsx";
import {useDispatch} from "react-redux";
import {openPopup} from "../app/store/popupSlice.js";

function UsersPage({titlePage, ...props}) {

    const list = [
        'Пользователи могут иметь разные роли - "Пользователь" или "Администратор", по-этому будьте осторожны при создании пользователя и выбора ролей, поскольку роль "Администратора" предоставляет доступ к управлению всей платформой;',
        'Поля "Логин" и "Ник" должны быть уникальными для каждого пользователя, по-этому убедитесь что они еще не присвоены другому пользователю;',
        'Все поля в форме являются обязательными, при возникновении ошибок следите за подсказками;',
        'После создания пользователя, предоставьте логин и пароль для входа на платформу.'
    ]
    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm({
        mode: 'onBlur'
    })
    const {data: rolesData} = useGetRolesQuery()
    const [regUser, {data: dataReg, error: errorReg}] = useRegistrationUserMutation()
    const dispatch =  useDispatch()
    const handleOnSubmit = async (values) => {
        const response = await regUser(values)
    }

    useEffect(()=>{
        if(dataReg){
            reset()
            dispatch(openPopup({type: 'success', text: 'Пользователь успешно добавлен'}))
        }
        if(errorReg){
            dispatch(openPopup({type: 'error', text: 'Произошла ошибка при добавлении нового пользователя. Возможно данный пользователь уже есть'}))
        }
    }, [dataReg, reset, errorReg, dispatch])

    return (
        <>
            <title>{titlePage}</title>
            <div className="block block_create_user">
                <div className="block__head">
                    <h2 className="block__title">
                        Создание пользователя
                    </h2>
                    <p className="block__text">
                        Создайте нового пользователя и предоставьте ему необходимые доступы
                    </p>
                </div>
                <Mark list={list} />
                <div className="create_user">
                    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="form__body">
                            <label className="form__label">
                                <span className="form__title">Логин</span>
                                <input
                                    type="text"
                                    placeholder="Введите логин"
                                    {...register('username', {required: 'Это поле являеться обязательным'})}
                                    className={(errors.username) && 'error'}
                                />
                                {
                                    (errors.username) &&
                                    <span className="form__error">{errors.username.message}</span>
                                }
                            </label>
                            <label className="form__label">
                                <span className="form__title">Пароль</span>
                                <input
                                    type="text"
                                    placeholder="Введите пароль"
                                    {...register('password', {required: 'Это поле являеться обязательным'})}
                                    className={(errors.password) && 'error'}
                                />
                                {
                                    (errors.password) &&
                                    <span className="form__error">{errors.password.message}</span>
                                }
                            </label>
                            <label className="form__label">
                                <span className="form__title">Ник</span>
                                <input
                                    type="text"
                                    placeholder="Введите ник"
                                    {...register('nickname', {required: 'Это поле являеться обязательным'})}
                                    className={(errors.nickname) && 'error'}
                                />
                                {
                                    (errors.nickname) &&
                                    <span className="form__error">{errors.nickname.message}</span>
                                }
                            </label>
                            <label className="form__label">
                                <span className="form__title">Роль</span>
                                <select defaultValue="0" {...register('role', {required: true, validate: (value) => value !== "0"})} className={(errors.role?.type === 'validate' || errors.role) && 'error'}>
                                    <option disabled value="0">Выберете роль пользователя</option>
                                    {
                                        (rolesData) &&
                                        rolesData.map((role) => {
                                            return <option value={role.id} key={role.id}>{role.name}</option>
                                        })
                                    }
                                </select>
                                {
                                    (errors.role?.type === 'validate' || errors.role) &&
                                    <span className="form__error">Это поле являеться обязательным</span>
                                }
                            </label>
                        </div>
                        <div className="form__footer">
                            <button className="button button_green form__button">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
            <TablesUsers />
        </>
    );
}

export default UsersPage;