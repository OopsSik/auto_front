import React, {useState} from 'react';
import {useGetAllCredentialQuery} from "../../app/store/credentialApi.js";
import RecordCredential from "../records/RecordCredential.jsx";
import Pagination from "../Pagination.jsx";

function TablesAllCredentials(props) {

    const [paged, setIsPaged] = useState(1)
    const {data, isSuccess} = useGetAllCredentialQuery({paged: paged}, {skip: !paged})

    return (
        <div className="block block_cred">
            <div className="block__head">
                <h2 className="block__title">
                    Таблица доступов
                </h2>
                <p className="block__text">
                    Здесь отображаються все доступы на платформе
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
                    <h3 className="records__head_item">
                        Статус
                    </h3>
                    <h3 className="records__head_item">

                    </h3>
                </div>
                <div className="records__content">
                    {
                        (data?.data?.length > 0 && isSuccess) &&
                        data.data.map((record)=>{
                            return <RecordCredential key={record.id} {...record} />
                        })
                    }
                </div>
                {
                    (isSuccess && data.totalPage > 1) &&
                    <Pagination currentPage={data.currentPage} totalPage={data.totalPage} changePage={setIsPaged} />
                }
            </div>
        </div>
    );
}

export default TablesAllCredentials;