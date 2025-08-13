import { useContext } from "react";
import {UserDataContext} from "../App.jsx";

const NavBar = ({ userData }) => {
    const context = useContext(UserDataContext);

    return (
        <nav className="flex justify-between items-center w-full h-24 border-b-[1px] border-gray-600 px-4">
            <div className="flex justify-center items-center  text-3xl gap-2">
                <img
                    src="./icons8-github-90.png"
                    className="w-16"
                    alt=""
                />
                <p className="text-gray-300">{userData?.login || context?.userData.login}</p>
            </div>

            <div className="flex justify-center items-center gap-5">
                <input
                    type="text"
                    placeholder="search"
                    className="w-[500px] h-10  text-2xl px-3 rounded-lg bg-transparent border-[1px] border-gray-600"
                    name=""
                    id=""
                />
                <img
                    src={userData?.avatar_url || context?.userData.avatar_url}
                    className="w-16 rounded-full"
                    alt=""
                />
            </div>
        </nav>
    );
};

export default NavBar;
