import React, {useState} from 'react';
import Icon_Delete from '../../assets/icons/icon_delete.svg'
import {ReactSVG} from "react-svg";
import {useDeleteUsersMutation} from "../../app/store/usersApi.js";
import {createPortal} from "react-dom";
import DeleteModal from "../modals/DeleteModal.jsx";
import {useSelector} from "react-redux";

function RecordUsers({id, date, username, password, nickname, role, ...props}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const dateRecord = new Date(date)
    const [deleteRecord, {data, error}] = useDeleteUsersMutation()
    const user = useSelector(state => state.user)

    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Дата:</span>
                <span className="record__item_text">{`${dateRecord.getDate()}.${(dateRecord.getMonth() < 10) ? '0' + (dateRecord.getMonth() + 1) : dateRecord.getMonth()}.${dateRecord.getFullYear()}`}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Логин:</span>
                <span className="record__item_text">{username}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Ник:</span>
                <span className="record__item_text">{nickname}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Роль:</span>
                <span className="record__item_text">{role}</span>
            </h3>
            {
                (id !== user.id) &&
                <h3 className="record__item" onClick={() => setIsModalOpen(true)}>
                <span className="record__item_delete">
                    <span className="record__item_delete_icon">
                        <ReactSVG src={Icon_Delete} />
                    </span>
                    <span className="record__item_delete_text">
                            Удалить
                    </span>
                </span>
                </h3>
            }

            {(isModalOpen) && createPortal(<DeleteModal id={id} title={'Удаление пользователя '+username} isModalOpen={isModalOpen} text={'Вы действительно хотите удалить пользователя?'} deleteFunction={deleteRecord} closeModal={setIsModalOpen} />, document.getElementById('modals'))}
        </div>
    );
}

export default RecordUsers;