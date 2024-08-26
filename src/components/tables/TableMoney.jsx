import React from 'react';
import {useGetUsersWithMoneyQuery} from "../../app/store/usersApi.js";
import RecordMoney from "../records/RecordMoney.jsx";

function TableMoney(props) {

    const {data, isSuccess} = useGetUsersWithMoneyQuery()

    if(data && isSuccess && data.length > 0){
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
                        Монеты
                    </h3>
                    <h3 className="records__head_item">

                    </h3>
                </div>
                <div className="records__content">
                    {
                        data?.map(user => {
                            return <RecordMoney key={user.id} {...user} />
                        })
                    }
                </div>
            </div>
        );
    }

}

export default TableMoney;