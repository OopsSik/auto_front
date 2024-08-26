import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useUploadCredentialMutation} from "../app/store/credentialApi.js";
import TablesAllCredentials from "../components/tables/TablesAllCredentials.jsx";
import {useDispatch} from "react-redux";
import {openPopup} from "../app/store/popupSlice.js";

function CredentialsPage({titlePage, ...props}) {

    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm({
        mode: 'onBlur'
    })
    const [uploadFile, {data, isSuccess, error, isError}] = useUploadCredentialMutation()
    const handleOnSubmit = async (values) => {
        const file = values.file[0]
        await uploadFile({file: file})
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        if(data && isSuccess){
            reset()
            dispatch(openPopup({type: 'success', text: 'Доступы из файла успешно загружены'}))
        }
        if(error && isError){
            dispatch(openPopup({type: 'error', text: 'Произошла ошибка при загрузке доступов из файла'}))
        }
    }, [data, isSuccess, reset])

    return (
        <>
            <title>{titlePage}</title>
            <div className="block block_create_cred">
                <div className="block__head">
                    <h2 className="block__title">
                        Загрузка телеграммов
                    </h2>
                    <p className="block__text">
                        Добавление телеграммов с помощью xlsx, xls (Excel таблицы) файлов
                    </p>
                </div>
                <div className="mark">
                    <div className="mark__head">
                        <div className="mark__head_icon">

                        </div>
                        <h3 className="mark__head_title">
                            Обратите внимание
                        </h3>
                    </div>
                    <div className="mark__content">
                        <ul>
                            <li>
                                Загрузка поддерживает только Excel таблицы, формат файлов должен быть xlsx или xls;
                            </li>
                            <li>
                                Первый ряд таблицы обязательно должен содержать названия столбцов: первая колонка - slug, вторая колонка - url, в противном случае вы не сможете загрузить данные из файла.
                            </li>
                            <li>
                                Запись данных из Excel файла в базу данных может занять некоторое время. При
                                возникновении ошибок следите за подсказками.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="create_cred">
                    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="form__body">
                            <div className="form__label">
                                <span className="form__title">Загрузка файла</span>
                                <span className="form__file">
                                  <input
                                      type="file"
                                      accept=".xlsx, .xls"
                                      {...register('file', {required: true})}
                                  />
                          <span className={(errors.file) ? 'form__file_element error': 'form__file_element'}>
                            <span className="form__file_element_icon">

                            </span>
                            <span className="form__file_element_text">
                              Загрузите файл
                            </span>
                          </span>
                        </span>
                                {
                                    (errors.file) &&
                                    <span className="form__error">Файл не добавлен</span>
                                }
                            </div>
                        </div>
                        <div className="form__footer">
                            <button className="form__button button button_green">
                                Загрузить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <TablesAllCredentials />
        </>
    );
}

export default CredentialsPage;