import React from 'react';

function RecordDate({id, username, today, week, month, ...props}) {
    return (
        <div className="record">
            <h3 className="record__item">
                <span className="record__item_title">#</span>
                <span className="record__item_count">{id}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">Пользователь</span>
                <span className="record__item_text">{username}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">За сегодня:</span>
                <span className="record__item_text">{today}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">За месяц:</span>
                <span className="record__item_text">{week}</span>
            </h3>
            <h3 className="record__item">
                <span className="record__item_title">За месяц:</span>
                <span className="record__item_text">{month}</span>
            </h3>
        </div>
    );
}

export default RecordDate;