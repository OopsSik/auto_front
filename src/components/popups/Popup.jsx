import React, {useCallback, useEffect} from 'react';
import Icon_Success from '../../assets/icons/popup_success.svg'
import Icon_Warning from '../../assets/icons/popup_warning.svg'
import Icon_Error from '../../assets/icons/popup_error.svg'
import {ReactSVG} from "react-svg";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";

function Popup({id, type, text, open, closePopup, ...props}) {

    const handleCheckType = useCallback((type) => {
        if(type === 'success'){
            return {
                className: 'popup popup_success',
                icon: Icon_Success
            }
        }else if(type === 'warning'){
            return {
                className: 'popup popup_warning',
                icon: Icon_Warning
            }
        }else if(type === 'error'){
            return {
                className: 'popup popup_error',
                icon: Icon_Error
            }
        }
    }, [type])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            closePopup(id)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {
                (document.getElementById('popups')) &&
                createPortal(
                    <AnimatePresence>
                        {
                            (open) &&
                            <motion.div className={handleCheckType(type).className} initial={{x: "100%"}} animate={{x: "0"}} exit={{x: "105%"}} transition={{duration: 0.3}}>
                                <div className="popup__content">
                                    <div className="popup__icon">
                                        <ReactSVG src={handleCheckType(type).icon} />
                                    </div>
                                    <div className="popup__text">
                                        <p>{text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>,
                    document.getElementById('popups')
                )
            }
        </>
    );
}

export default Popup;