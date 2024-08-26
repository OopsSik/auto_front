import React from 'react';
import {ReactSVG} from "react-svg";
import ICON_ModalClose from '../../assets/icons/modal_close.svg'
import {AnimatePresence, motion} from "framer-motion";

function DeleteModal({id, title, text, isModalOpen, deleteFunction, closeModal, ...props}) {

    console.log(id)

    const handleOnClick = async (id) => {
        await deleteFunction({id: id})
        closeModal(false)
    }

    return (
        <AnimatePresence>
            {
                (isModalOpen) &&
                <motion.div key="delete_modal" className="modal" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.1}}>
                    <div className="modal__wrapper" >
                        <div className="modal__close" onClick={()=>closeModal(false)}>
                            <ReactSVG src={ICON_ModalClose} />
                        </div>
                        <div className="modal__content">
                            <h3 className="modal__title">
                                {title}
                            </h3>
                            <p className="modal__text">
                                {text}
                            </p>
                            <div className="modal__buttons">
                                <div className="modal__accept button button_green" onClick={()=>handleOnClick(id)}>
                                    Принять
                                </div>
                                <div className="modal__cancel button button_red" onClick={()=>closeModal(false)}>
                                    Отменить
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            }

        </AnimatePresence>
    );
}

export default DeleteModal;