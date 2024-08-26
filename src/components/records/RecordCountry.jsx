import React, {useState} from 'react';
import {ReactSVG} from "react-svg";
import ICON_Delete from '../../assets/icons/icon_delete.svg'
import {createPortal} from "react-dom";
import DeleteModal from "../modals/DeleteModal.jsx";
import {useDeleteCountryMutation} from "../../app/store/countryApi.js";

function RecordCountry({id, slug, name, updatedAt, ...props}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteCountry, {data, error}] = useDeleteCountryMutation()
    const dateRecord = new Date(updatedAt)

    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Слаг(Slug):</span>
                <span className="record__item_text">{slug}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Название:</span>
                <span className="record__item_text">{name}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Дата:</span>
                <span className="record__item_text">{`${dateRecord.getDate()}.${(dateRecord.getMonth() < 10) ? '0' + (dateRecord.getMonth() + 1) : dateRecord.getMonth()}.${dateRecord.getFullYear()}`}</span>
            </h3>
            <h3 className="record__item" onClick={()=>setIsModalOpen(true)}>
                <span className="record__item_delete">
                    <span className="record__item_delete_icon">
                        <ReactSVG src={ICON_Delete} />
                    </span>
                    <span className="record__item_delete_text">
                        Удалить
                    </span>
                </span>
            </h3>
            {(isModalOpen) && createPortal(<DeleteModal id={id} title={'Удаление страны '+name} isModalOpen={isModalOpen} text={'Вы действительно хотите удалить страну?'} closeModal={setIsModalOpen} deleteFunction={deleteCountry} />, document.getElementById('modals'))}
        </div>
    );
}

export default RecordCountry;