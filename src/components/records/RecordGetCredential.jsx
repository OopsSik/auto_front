import React, {useState} from 'react';
import {useUpdateCredentialMutation} from "../../app/store/credentialApi.js";
import {openPopup} from "../../app/store/popupSlice.js";
import {updateMoney} from "../../app/store/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useChangeMoneyUserMutation} from "../../app/store/userApi.js";

function RecordGetCredential({id, url, ...props}) {

    const [active, isActive] = useState(true)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [changeMoney, {data: dataChange, isSuccess: isSuccessChange}] = useChangeMoneyUserMutation()
    const [updateCredential, {data: dataUpdate, isSuccess: isSuccessUpdate}] = useUpdateCredentialMutation()
    const handleGetCredential = async (idCred, idUser) => {
        if(parseInt(user.money) === 0){
            dispatch(openPopup({type: 'error', text: 'У вас закончились монеты. Дождитесь обновления или обратитесь к администратору'}))
        }else{
            const responseUpdate = await updateCredential({idCred, idUser})
            if(responseUpdate?.data?.status === 200){
                const responseChange = await changeMoney()
                isActive(false)
                if(responseChange.data.money){
                    dispatch(updateMoney({money: responseChange.data.money}))
                    dispatch(openPopup({type: 'success', text: 'Вы забрали телеграмм. Перейдите в свой профиль для его просмотра.'}))
                }
            }
        }
    }

    return (
        <div className="result__item_content">
            <div className="result__item_values">
                <h3 className="result__item_value">
                    Ссылка: <span>{url.slice(0, 20)+'*******'}</span>
                </h3>
            </div>
            {
                (active) &&
                <div className="result__item_button button button_green" onClick={()=>handleGetCredential(id, user.id)}>
                    Забрать
                </div>
            }
            {
                (!active) &&
                <div className="result__item_button button button_gray">
                    Забрано
                </div>
            }
        </div>
    );
}

export default RecordGetCredential;