import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closePopup, removePopup} from "../../app/store/popupSlice.js";
import Popup from "./Popup.jsx";

function PopupWrapper(props) {

    const popups = useSelector(state => state.popups.popups)
    const dispatch = useDispatch()

    const handleClosePopup = (id) => {
        dispatch(closePopup({id}))
        setTimeout(()=>dispatch(removePopup({id})), 300)
    }

    return (
        <div className="popups">
            <div className="popups__wrapper" id="popups">
                {
                    (popups && popups.length > 0) &&
                    popups.map(popup => {
                        return <Popup key={popup.id} {...popup} closePopup={handleClosePopup} />
                    })
                }
            </div>
        </div>
    );
}

export default PopupWrapper;