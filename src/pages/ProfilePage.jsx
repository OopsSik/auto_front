import React from 'react';
import Image_Background from "../assets/images/profile_page_background.png"
import {useSelector} from "react-redux";
import TableProfile from "../components/tables/TableProfile.jsx";

function ProfilePage({titlePage, ...props}) {

    const {id, username, nickname} = useSelector(state => state.user)

    return (
        <>
            <title>{titlePage}</title>
            <div className="profile__hero">
                <div className="profile__hero_background">
                    <img src={Image_Background} alt=""/>
                </div>
                <div className="profile__hero_head">
                    <h2 className="profile__hero_head_title">
                        Ваш профиль
                    </h2>
                </div>
                <div className="profile__hero_wrapper">
                    <div className="profile__hero_item">
                        <h3 className="profile__hero_title">
                            ID:
                        </h3>
                        <h3 className="profile__hero_value">
                            #{id}
                        </h3>
                    </div>
                    <div className="profile__hero_item">
                        <h3 className="profile__hero_title">
                            Логин:
                        </h3>
                        <h3 className="profile__hero_value">
                            {username}
                        </h3>
                    </div>
                    <div className="profile__hero_item">
                        <h3 className="profile__hero_title">
                            Никнейм:
                        </h3>
                        <h3 className="profile__hero_value">
                            {nickname}
                        </h3>
                    </div>
                </div>
            </div>
            <TableProfile/>
        </>
    );
}

export default ProfilePage;