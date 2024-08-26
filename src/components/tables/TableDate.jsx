import React, {useEffect} from 'react';
import {useGetStatsUsersQuery} from "../../app/store/settingApi.js";
import RecordDate from "../records/RecordDate.jsx";
import {useDispatch} from "react-redux";
import {openPopup} from "../../app/store/popupSlice.js";

function TableDate(props) {

    const {data, isSuccess, error, isError} = useGetStatsUsersQuery()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isError && error){
            dispatch(openPopup({type: 'error', text: 'При загрузке статистики пользователей произошла ошибка'}))
        }
    }, [isError, dispatch])

    return (
        <div className="records">
            <div className="records__head">
                <h3 className="records__head_item">
                    #
                </h3>
                <h3 className="records__head_item">
                    Пользователь
                </h3>
                <h3 className="records__head_item">
                    За сегодня
                </h3>
                <h3 className="records__head_item">
                    За неделю
                </h3>
                <h3 className="records__head_item">
                    За месяц
                </h3>
            </div>
            <div className="records__content">
                {
                    (data && isSuccess && data?.map) &&
                    data.map(record => {
                        return <RecordDate key={record.id} {...record} />
                    })
                }
            </div>
        </div>
    );
}

export default TableDate;