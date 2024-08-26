import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useGetMoneyQuery, useSetMoneyMutation} from "../app/store/settingApi.js";
import TableMoney from "../components/tables/TableMoney.jsx";
import {useDispatch} from "react-redux";
import {openPopup} from "../app/store/popupSlice.js";

function MoneyPage({titlePage, ...props}) {

    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm({
        mode: 'onBlur'
    })
    const {data: dataGet, error: isErrorGet, isSuccess: isSuccessGet} = useGetMoneyQuery()
    const [setMoney, {data: dataSet, isSuccess: isSuccessSet, isError: isErrorSet}] = useSetMoneyMutation()
    const handleOnSubmit = async (values) => {
        await setMoney(values)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        if(dataGet?.moneys && isSuccessGet){
            reset({
                money: dataGet?.moneys
            })
        }
        if(dataSet && isSuccessSet){
            dispatch(openPopup({type: 'success', text: 'Монеты для ежедневного обновления - обновлены.'}))
        }
        if(isErrorSet){
            dispatch(openPopup({type: 'error', text: 'Произошла ошибка при обновлении монет.'}))
        }
    }, [dataGet, isSuccessGet, dispatch, isErrorSet, dataSet, isSuccessSet])

    return (
        <>
            <title>{titlePage}</title>
            {
                (isSuccessGet) &&
                <div className="block block_create_money">
                    <div className="block__head">
                        <h2 className="block__title">
                            Обновление монет
                        </h2>
                        <p className="block__text">
                            Установите количество монет для пользователей при обновлении даты
                        </p>
                    </div>
                    <div className="create_money">
                        <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
                            <div className="form__body">
                                <label className="form__label">
                                    <span className="form__title">Количество монет</span>
                                    <input
                                        type="number"
                                        placeholder="Введите количество монет"
                                        min="0"
                                        {...register('money', {required: 'Это поле являеться обязательным и не может быть меньше 0'})}
                                        className={(errors.money && 'error')}
                                    />
                                    {
                                        (errors.money) &&
                                        <span className="form__error">{errors.money.message}</span>
                                    }
                                </label>
                            </div>
                            <div className="form__footer">
                                <button className="form__button button button_green">Установить</button>
                            </div>
                        </form>
                    </div>
                </div>
            }

            <div className="block block_money">
                <div className="block__head">
                    <h2 className="block__title">
                        Таблица монет
                    </h2>
                    <p className="block__text">
                        Количество монет на данный момент у пользователей. При необходимости можете обновить их
                        количество
                    </p>
                </div>
                <TableMoney />
            </div>
        </>
    );
}

export default MoneyPage;