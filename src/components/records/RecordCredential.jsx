import React, {useState} from 'react';
import ICON_Delete from '../../assets/icons/icon_delete.svg'
import {ReactSVG} from "react-svg";
import {useDeleteCredentialMutation} from "../../app/store/credentialApi.js";
import {createPortal} from "react-dom";
import DeleteModal from "../modals/DeleteModal.jsx";

function RecordCredential({id, url, updatedAt, country, status, ...props}) {

    const dateRecord = new Date(updatedAt)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteCredential, {data, isSuccess}] = useDeleteCredentialMutation()

    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Ссылка:</span>
                <a href="#"
                   className="record__item_text record__item_link">{url}</a>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Страна:</span>
                <span className="record__item_text">{country.name}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Дата:</span>
                <span
                    className="record__item_text">{`${dateRecord.getDate()}.${(dateRecord.getMonth() < 10) ? '0' + (dateRecord.getMonth() + 1) : dateRecord.getMonth()}.${dateRecord.getFullYear()}`}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Статус:</span>
                <span className="record__item_text">{(status) ? 'Активный' : 'Неактивный'}</span>
            </h3>
            <h3 className="record__item" onClick={()=>setIsModalOpen(true)}>
                        <span className="record__item_delete">
                          <span className="record__item_delete_icon">
                              <ReactSVG src={ICON_Delete}/>
                          </span>
                          <span className="record__item_delete_text">
                              Удалить
                          </span>
                        </span>
            </h3>
            {
                (isModalOpen) && createPortal(<DeleteModal id={id} title={'Удаление доступа #'+id} isModalOpen={isModalOpen} text={'Вы действительно хотите удалить доступ?'} closeModal={setIsModalOpen} deleteFunction={deleteCredential} />, document.getElementById('modals'))
            }
        </div>
    );
}

export default RecordCredential;