import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useUpdateMoneyUserMutation} from "../../app/store/usersApi.js";
import {useDispatch, useSelector} from "react-redux";
import {updateMoney} from "../../app/store/userSlice.js";
import {openPopup} from "../../app/store/popupSlice.js";

function RecordMoney({id, username, money, ...props}) {

    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm()
    const [updateMoneyFetch, {data, isSuccess}] = useUpdateMoneyUserMutation()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleOnSubmit = async (values) => {
        const response = await updateMoneyFetch({id: id, money: values.money})
        if(response.data.id === user.id){
            dispatch(updateMoney({money: response.data.money}))
        }
        dispatch(openPopup({type: 'success', text: `Монеты для ${username} успешно обновлены`}))
    }

    useEffect(()=>{
        reset({
            money: money
        })
    }, [reset])

    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Пользователь:</span>
                <span className="record__item_text">{username}</span>
            </h3>
            <h3 className="record__item">
                <form id={'update-form-'+id} onSubmit={handleSubmit(handleOnSubmit)}>
                    <span className="record__item_title">Монеты:</span>
                    <span className="record__item_input_number">
                    <label>
                        <input
                            type="number"
                            min="0"
                            {...register('money')}
                        />
                    </label>
                </span>
                </form>
            </h3>
            <h3 className="record__item">
                <span className="record__item_button">
                    <button form={'update-form-'+id} className="button button_green">Обновить</button>
                </span>
            </h3>
        </div>
    );
}

export default RecordMoney;