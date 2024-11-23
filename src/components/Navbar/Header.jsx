
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import useGetUserInfo from "../../hooks/useGetuserInfo";
import Cookies from "js-cookie";
const links = [
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Order",
        url: "/order"
    },
]
const Header = () => {
    const navigate = useNavigate()
    const accessToken = Cookies.get("accessToken")
    const { user } = useGetUserInfo(accessToken)
    const handleLogout = () => {
        Cookies.remove("accessToken")
        navigate("/login")
    };


    return (
        <header className="bg-white shadow-md border-b p-2">
            <div className="container flex justify-between items-center">
                <nav className="space-x-4">
                    {links.map((link) => (
                        <NavLink
                            to={link.url}
                            key={link.title}
                            className={({ isActive }) =>
                                isActive
                                    ? " underline"
                                    : "text-gray-600 hover:underline hover:text-black"
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}

                </nav>
                {user && <UserMenu user={user} onLogout={handleLogout} />}
            </div>
        </header>
    );
};

export default Header;
