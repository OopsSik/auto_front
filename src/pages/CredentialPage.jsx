import React, {useState} from 'react';
import Mark from "../components/Mark.jsx";
import {useGetCountryAllQuery} from "../app/store/countryApi.js";
import ICON_Check from '../assets/icons/check_icon.svg'
import {ReactSVG} from "react-svg";
import {useGetByCountryCredentialMutation, useUpdateCredentialMutation} from "../app/store/credentialApi.js";
import {useDispatch, useSelector} from "react-redux";
import {useChangeMoneyUserMutation} from "../app/store/userApi.js";
import {updateMoney} from "../app/store/userSlice.js";
import {openPopup} from "../app/store/popupSlice.js";
import RecordGetCredential from "../components/records/RecordGetCredential.jsx";

function CredentialPage({titlePage, ...props}) {

    const list = [
        'Для получение необходимых для Вас телеграммов, отметьте необходимые критерии и нажмите кнопку "Применить";',
        'Если результатов не найдено, попробуйте изменить критерии или связаться с администратором.'
    ]
    const {data: dataCountry, isSuccess: isSuccessCountry} = useGetCountryAllQuery()
    const [filter, setFilter] = useState([])
    const [getCredential, {data: dataGet, isSuccess: IsSuccessGet}] = useGetByCountryCredentialMutation()

    const handleToggleFilter = (id) => {
        if(filter.includes(id)){
            const result = filter.filter((filterID) => filterID !== id)
            setFilter(result)
        }else{
            setFilter([...filter, id])
        }
    }

    const handleFindCredential = async (ids) => {
        await getCredential({ids: ids})
    }

    return (
        <>
            <title>{titlePage}</title>
            <div className="block block_find">
                <div className="block__head">
                    <h2 className="block__title">
                        Фильтр
                    </h2>
                </div>
                <Mark list={list} />
                <div className="filter">
                    <div className="filter__block">
                        <h3 className="filter__title">
                            Страны
                        </h3>
                        <div className="filter__items">
                            {
                                (dataCountry?.length > 0 && isSuccessCountry) &&
                                    dataCountry.map((country) => {
                                       return <div className={(filter.includes(country.id)) ? 'filter__item active' : 'filter__item'} key={country.id} onClick={() => handleToggleFilter(country.id)}>
                                           <div className="filter__item_icon">
                                               <ReactSVG src={ICON_Check} />
                                           </div>
                                           <h4 className="filter__item_title">
                                               {country.name}
                                           </h4>
                                       </div>
                                    })
                            }
                        </div>
                    </div>
                    <div className="filter__footer">
                        <div className="filter__button button button_green" onClick={()=>handleFindCredential(filter)}>
                            Применить
                        </div>
                    </div>
                </div>
            </div>
            <div className="block block_result">
                <div className="block__head">
                    <h2 className="block__title">
                        Результаты
                    </h2>
                </div>
                <div className="result">
                    <div className="result__items">
                        {
                            (IsSuccessGet && dataGet?.result?.length > 0) &&
                                dataGet?.result?.map((row, index) => {
                                    return <div className="result__item" key={index}>
                                        <div className="result__item_head">
                                            <h2 className="result__item_title">
                                                Результат по критерию: <span>{row.country.name}</span>
                                            </h2>
                                        </div>
                                        {
                                            (row.credentials?.length > 0 && row.credentials?.map)
                                            ?
                                                row.credentials.map(credential => {
                                                    return <RecordGetCredential key={credential.id} {...credential} />
                                                })
                                            :
                                                <div className="result__item_content">
                                                    <div className="result__item_values">
                                                        <h3 className="result__item_value">
                                                            Ничего не найдено
                                                        </h3>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                })
                        }
                        {
                            (IsSuccessGet && dataGet?.result === null) &&
                            <div className="result__not">
                                По вашим критериям ничего не было найдено. Попробуйте изменить критерии или обратитесь к
                                администратору
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CredentialPage;