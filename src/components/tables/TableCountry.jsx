import React, {useState} from 'react';
import {useGetCountryQuery} from "../../app/store/countryApi.js";
import RecordCountry from "../records/RecordCountry.jsx";
import Pagination from "../Pagination.jsx";

function TableCountry(props) {

    const [paged, setIsPaged] = useState(1)
    const {data, isSuccess, error, isError} = useGetCountryQuery({paged: paged}, {skip: !paged})

    return (
        <div className="block block_country">
            <div className="block__head">
                <h2 className="block__title">
                    Таблица стран
                </h2>
                <p className="block__text">
                    Здесь отображаються все страны на платформе
                </p>
            </div>
            <div className="records">
                <div className="records__head">
                    <h3 className="records__head_item">
                        #
                    </h3>
                    <h3 className="records__head_item">
                        Слаг(Slug)
                    </h3>
                    <h3 className="records__head_item">
                        Название
                    </h3>
                    <h3 className="records__head_item">
                        Дата
                    </h3>
                    <h3 className="records__head_item">

                    </h3>
                </div>
                <div className="records__content">
                    {
                        (isSuccess && data.data.length > 0)
                        ?
                            data.data?.map((country)=>{
                                return <RecordCountry key={country.id} {...country} />
                            })
                        :
                            <></>
                    }
                </div>
                {
                    (data?.totalPage > 1 && isSuccess) &&
                    <Pagination currentPage={data.currentPage} totalPage={data.totalPage} changePage={setIsPaged} />
                }
            </div>
        </div>
    );
}

export default TableCountry;