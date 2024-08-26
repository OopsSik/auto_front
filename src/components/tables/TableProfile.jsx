import React, {useState} from 'react';
import RecordProfile from "../records/RecordProfile.jsx";
import Pagination from "../Pagination.jsx";
import {useGetByUserCredentialQuery} from "../../app/store/credentialApi.js";
import {useSelector} from "react-redux";

function TableProfile(props) {

    const [paged, setPaged] = useState(1)
    const user = useSelector(state => state.user)
    const {data, isSuccess} = useGetByUserCredentialQuery({paged: paged, id: user.id}, {skip: !paged || !user.id})

    return (
        <div className="block block_profile">
            <div className="block__head">
                <h2 className="block__title">
                    Таблица телеграммов
                </h2>
                <p className="block__text">
                    Здесь отображаються Ваши полученные телеграммы
                </p>
            </div>
            <div className="records">
                <div className="records__head">
                    <h3 className="records__head_item">
                        #
                    </h3>
                    <h3 className="records__head_item">
                        Ссылка
                    </h3>
                    <h3 className="records__head_item">
                        Страна
                    </h3>
                    <h3 className="records__head_item">
                        Дата
                    </h3>
                </div>
                <div className="records__content">
                    {
                        (data?.data?.length > 0 && isSuccess) &&
                        data?.data?.map((row)=>{
                            return <RecordProfile key={row.id} {...row} />
                        })
                    }
                </div>
                {
                    (data?.totalPage > 1 && isSuccess) &&
                    <Pagination currentPage={data.currentPage} totalPage={data.totalPage} changePage={setPaged} />
                }
            </div>
        </div>
    );
}

export default TableProfile;