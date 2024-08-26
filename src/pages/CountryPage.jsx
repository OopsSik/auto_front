import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import Mark from "../components/Mark.jsx";
import {useCreateCountryMutation} from "../app/store/countryApi.js";
import TableCountry from "../components/tables/TableCountry.jsx";
import {openPopup} from "../app/store/popupSlice.js";
import {useDispatch} from "react-redux";

function CountryPage({titlePage, ...props}) {

    const list = [
        ' Поле "слаг" (англ. "slug") должно быть уникальным для каждой страны, по-этому убедитесь что такой "слаг" еще не используеться;',
        'Все поля в форме являются обязательными, при возникновении ошибок следите за подсказками.'
    ]
    const {register, handleSubmit, formState, formState: {errors}, reset} = useForm(
        {
            mode: "onBlur"
        }
    )
    const [createCountry, {data, error, isError, isSuccess}] = useCreateCountryMutation()
    const handleOnSubmit = async (values) => {
        const response = await createCountry(values)
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isSuccess && data){
            reset()
            dispatch(openPopup({type: 'success', text: 'Страна успешно добавлена'}))
        }
        if(error && isError){
            dispatch(openPopup({type: 'error', text: 'При добалении страны произошла ошибка. Возможна страна з таким слагом уже есть'}))
        }
    }, [isSuccess, data, reset, error, isError, dispatch])

    return (
        <>
            <title>{titlePage}</title>
            <div className="block block_create_country">
                <div className="block__head">
                    <h2 className="block__title">
                        Создание страны
                    </h2>
                    <p className="block__text">
                        Создайте новую страну и привязывайте к ней доступы
                    </p>
                </div>
                <Mark list={list} />
                <div className="create_country">
                    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="form__body">
                            <label className="form__label">
                                <span className="form__title">Слаг(Slug)</span>
                                <input
                                    type="text"
                                    placeholder="Введите слаг"
                                    {...register('slug', {required: 'Это поле являеться обязательным'})}
                                    className={(errors.slug) && 'error'}
                                />
                                {
                                    (errors.slug) &&
                                    <span className="form__error">{errors.slug.message}</span>
                                }
                            </label>
                            <label className="form__label">
                                <span className="form__title">Название</span>
                                <input
                                    type="text"
                                    placeholder="Введите название"
                                    {...register('name', {required: 'Это поле являеться обязательным'})}
                                    className={(errors.name) && 'error'}
                                />
                                {
                                    (errors.name) &&
                                    <span className="form__error">{errors.name.message}</span>
                                }
                            </label>
                        </div>
                        <div className="form__footer">
                            <button className="button button_green form__button">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
            <TableCountry />
        </>
    );
}

export default CountryPage;