import React, {useState} from 'react';
import {useGetUsersQuery} from "../../app/store/usersApi.js";
import RecordUsers from "../records/RecordUsers.jsx";
import Pagination from "../Pagination.jsx";
import {useSelector} from "react-redux";

function TablesUsers(props) {

    const [paged, setIsPaged] = useState(1)
    const user = useSelector(state => state.user)
    const {data, isSuccess, isError} = useGetUsersQuery({paged: paged}, {skip: !paged})

    return (
        <>
            <div className="block block_users">
                <div className="block__head">
                    <h2 className="block__title">
                        Таблица пользователей
                    </h2>
                    <p className="block__text">
                        Здесь отображаються все пользователи платформы
                    </p>
                </div>
                <div className="records">
                    <div className="records__head">
                        <h3 className="records__head_item">
                            #
                        </h3>
                        <h3 className="records__head_item">
                            Дата
                        </h3>
                        <h3 className="records__head_item">
                            Логин
                        </h3>
                        <h3 className="records__head_item">
                            Ник
                        </h3>
                        <h3 className="records__head_item">
                            Роль
                        </h3>
                        <h3 className="records__head_item">

                        </h3>
                    </div>
                    <div className="records__content">
                        {
                            (data?.data && isSuccess && data.length !== 0) &&
                            data?.data?.map((record) => {
                                return <RecordUsers key={record.id} {...record} />
                            })
                        }
                    </div>
                    {
                        (isSuccess && data?.totalPage > 1) &&
                        <Pagination currentPage={data.currentPage} totalPage={data.totalPage} changePage={setIsPaged} />
                    }
                </div>
            </div>
        </>
    );
}

export default TablesUsers;