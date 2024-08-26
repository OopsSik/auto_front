import React from 'react';

function RecordProfile({id, url, country, updatedAt}) {

    const dateRecord = new Date(updatedAt)


    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Ссылка:</span>
                <a href={url} target="_blank"
                   className="record__item_text record__item_link">{url}</a>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Страна:</span>
                <span className="record__item_text">{country.name}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Дата:</span>
                <span className="record__item_text">{`${dateRecord.getDate()}.${(dateRecord.getMonth() < 10) ? '0' + (dateRecord.getMonth() + 1) : dateRecord.getMonth()}.${dateRecord.getFullYear()}`}</span>
            </h3>
        </div>
    );
}

export default RecordProfile;