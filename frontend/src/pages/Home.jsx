/* eslint-disable no-unused-vars */

import { useEffect,useState, useContext } from "react";
import axios from "axios";
import Repos from "../components/Repos";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import {UserDataContext} from "../App"

const Home = () => {
    const [userData, setuserData] = useState([]);
    const [userRepos, setuserRepos] = useState([]);
    const navigate = useNavigate();

    const context = useContext(UserDataContext)
    const user = context.userData.login;


    const getFullRepo = async (itm) => {
        const data = await axios.get(
            `http://localhost:3000/api/test/directries/${itm.name}/?owner=${user}`,
            {
                withCredentials: true,
            }
        );
        if (data.data.success) {
            navigate("/folders", {
                state: {pageContent: data.data, repoName: itm.name},
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                //user profile

                const userDataProf = await axios.get(
                    "http://localhost:3000/api/user/profile",
                    {
                        withCredentials: true,
                    }
                );

                setuserData(userDataProf.data.userData);
                context.setuserData(userDataProf.data.userData)
                

                //user repos

                const userReposData = await axios.get(
                    "http://localhost:3000/api/test/repos",
                    {
                        withCredentials: true,
                    }
                );
                setuserRepos(userReposData.data.userrepos);

            } catch (error) {
                if (error) {
                    console.log(error);
                }
            }
        };

        getData();
    }, []);

    return (
        <div className="flex justify-start items-center min-h-screen flex-col bg-[#010409] text-gray-300">
            <NavBar userData={userData} />
            <div className="w-full flex p-20 gap-20">
                <div className=" flex justify-start items-start flex-col">
                    <img
                        src={userData.avatar_url}
                        className="w-full rounded-full mb-10"
                        alt=""
                    />
                    <h1 className="text-4xl">{userData.name}</h1>
                    <h2 className="text-3xl text-gray-500 mb-5">
                        {userData.login}
                    </h2>
                    <h2 className="text-2xl">{userData.bio}</h2>

                    <div className="w-full text-2xl flex gap-5 mt-10">
                        <span>{userData.followers} followers</span>
                        <span>{userData.following} following</span>
                    </div>
                </div>
                <div className="w-9/12 border-t-[1px] border-gray-600">
                    {userRepos.map((itm, index) => (
                        <div
                            key={index}
                            className="w-full h-40 border-b-[1px] border-gray-600 flex items-center justify-between"
                            onClick={()=>getFullRepo(itm)}
                        >
                            <Repos userRepos={itm} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
