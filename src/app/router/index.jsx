import {createBrowserRouter} from "react-router-dom";
import HomePage from "../../pages/HomePage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import ProfilePage from "../../pages/ProfilePage.jsx";
import CredentialPage from "../../pages/CredentialPage.jsx";
import StatisticsPage from "../../pages/StatisticsPage.jsx";
import UsersPage from "../../pages/UsersPage.jsx";
import CredentialsPage from "../../pages/CredentialsPage.jsx";
import CountryPage from "../../pages/CountryPage.jsx";
import MoneyPage from "../../pages/MoneyPage.jsx";

const titlePlatform = 'Автовыдача - '

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <ProfilePage titlePage={titlePlatform+'Мой профиль'} />
            },
            {
                path: '/credential',
                element: <CredentialPage titlePage={titlePlatform+'Поиск доступов'} />
            },
            {
                path: '/statistics',
                element: <StatisticsPage titlePage={titlePlatform+'Статистика'} />
            },
            {
                path: '/users',
                element: <UsersPage titlePage={titlePlatform+'Пользователи'} />
            },
            {
                path: '/credentials',
                element: <CredentialsPage titlePage={titlePlatform+'Доступы'} />
            },
            {
                path: '/country',
                element: <CountryPage titlePage={titlePlatform+'Страны'} />
            },
            {
                path: '/money',
                element: <MoneyPage titlePage={titlePlatform+'Монеты'} />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage titlePage={titlePlatform+'Вход'} />
    }
])