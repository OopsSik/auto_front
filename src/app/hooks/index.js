import {useEffect, useState} from "react";
import {useGetDataUserQuery} from "../store/userApi.js";
import {useDispatch} from "react-redux";
import {signUser} from "../store/userSlice.js";

export const useAuth = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('accessToken')
    const {data, error, isSuccess, isError} = useGetDataUserQuery(undefined, {skip: !accessToken, keepUnusedDataFor: 0})

    useEffect(()=>{
        if(!accessToken){
            setIsLoading(false)
            setIsAuth(false)
        }
        if(accessToken && error && isError){
            setIsLoading(false)
            setIsAuth(false)
        }
        if(accessToken && data && isSuccess){
            dispatch(signUser(data))
            setIsLoading(false)
            setIsAuth(true)
        }

    }, [setIsLoading, setIsAuth, data, error, isSuccess, isError])

    return {isLoading, isAuth}

}