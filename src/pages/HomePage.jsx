import React, {useState} from 'react';
import {useAuth} from "../app/hooks/index.js";
import {Navigate, Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Menu from "../components/Menu.jsx";
import Footer from "../components/Footer.jsx";
import PopupWrapper from "../components/popups/PopupWrapper.jsx";

function HomePage(props) {

    const {isLoading, isAuth} = useAuth()
    const [openMenu, setOpenMenu] = useState(false)

    if (!isLoading && !isAuth) {
        return <Navigate to='/login'/>
    }

    if (!isLoading && isAuth) {
        return (
            <div className="app-wrapper">
                <div className="app-wrapper__container">
                    <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
                    <div className="page">
                        <div className="page__content">
                            <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
                            <div className="page__wrapper">
                                <Outlet/>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
                <div className="modals">
                    <div className="modals__wrapper" id="modals">

                    </div>
                </div>
                <PopupWrapper />
            </div>
        );
    }

}

export default HomePage;