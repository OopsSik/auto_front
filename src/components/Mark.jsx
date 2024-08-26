import React from 'react';
import Icon_Mark from '../assets/icons/mark.svg'
import {ReactSVG} from "react-svg";

function Mark({list, ...props}) {
    return (
        <>
            <div className="mark">
                <div className="mark__head">
                    <div className="mark__head_icon">
                        <ReactSVG src={Icon_Mark} />
                    </div>
                    <h3 className="mark__head_title">
                        Обратите внимание
                    </h3>
                </div>
                <div className="mark__content">
                    <ul>
                        {
                            (list && list.length !== 0) &&
                            list.map((li, index) => {
                                return <li key={index}>{li}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Mark;