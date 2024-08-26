import React from 'react';
import {useGetStatsQuery} from "../app/store/settingApi.js";
import TableDate from "../components/tables/TableDate.jsx";

function StatisticsPage({titlePage, ...props}) {

    const {data, isSuccess} = useGetStatsQuery()

    if(data && isSuccess){
        return (
            <>
                <title>{titlePage}</title>
                <div className="block block_stat_cred">
                    <div className="block__head">
                        <h2 className="block__title">
                            Телеграммы
                        </h2>
                        <p className="block__text">
                            Общая статистика по телеграммам
                        </p>
                    </div>
                    <div className="stat">
                        <div className="stat__items">
                            <div className="stat__item">
                                <h3 className="stat__item_title">
                                    Всего:
                                </h3>
                                <h3 className="stat__item_value">
                                    {data.credentials}
                                </h3>
                            </div>
                            <div className="stat__item">
                                <h3 className="stat__item_title">
                                    Активных:
                                </h3>
                                <h3 className="stat__item_value">
                                    {data.activeCredentials}
                                </h3>
                            </div>
                            <div className="stat__item">
                                <h3 className="stat__item_title">
                                    Регионов:
                                </h3>
                                <h3 className="stat__item_value">
                                    {data.countries}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block block_stat_user">
                    <div className="block__head">
                        <h2 className="block__title">
                            Пользователи
                        </h2>
                        <p className="block__text">
                            Общая статистика по пользователям
                        </p>
                    </div>
                    <div className="stat">
                        <div className="stat__items">
                            <div className="stat__item">
                                <h3 className="stat__item_title">
                                    Всего:
                                </h3>
                                <h3 className="stat__item_value">
                                    {data.users}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block block_stat_date">
                    <div className="block__head">
                        <h2 className="block__title">
                            Статистика пользователей
                        </h2>
                        <p className="block__text">
                            Статистика пользователей по использованию телеграмов по датам
                        </p>
                    </div>
                    <TableDate />
                </div>
            </>
        );
    }

}

export default StatisticsPage;