import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageItems from "../components/pageItems";
import NavBar from "../components/NavBar";
import { UserDataContext } from "../App.jsx";
import axios from "axios";

const FoldersPage = () => {
    const location = useLocation();
    const locaionState = location.state;
    const [pageContent, setpageContent] = useState(
        locaionState.pageContent.userResponse
    );
    const repoName = locaionState.repoName;
    const context = useContext(UserDataContext);
    const user = context.userData.login;

    const navigate = useNavigate();

    const insideFolderFuncion = async (path) => {
        const data = await axios.get(
            `http://localhost:3000/api/test/directries/${repoName}/?path=${path}&owner=${user}`,
            {
                withCredentials: true,
            }
        );
        setpageContent(data.data.userResponse);
    };

    const codeFileFunction = async (path) => {
        const data = await axios.get(
            `http://localhost:3000/api/test/getCode/?repo=${repoName}&path=${path}&owner=${user}`,
            {
                withCredentials: true,
            }
        );

        navigate("/summary", {
            state: { code: data.data.userResponse },
        });
    };

    

    return (
        <div className="w-full min-h-screen bg-[#010409] text-gray-300">
            <NavBar />
            <div className="w-full flex p-20 gap-20">
                <div className=" flex justify-start items-start flex-col">
                    <img
                        src={context?.userData.avatar_url}
                        className="w-full rounded-full mb-10"
                        alt=""
                    />
                    <h1 className="text-4xl">{context?.userData.name}</h1>
                    <h2 className="text-3xl text-gray-500 mb-5">
                        {context?.userData.login}
                    </h2>
                    <h2 className="text-2xl">{context?.userData.bio}</h2>

                    <div className="w-full text-2xl flex gap-5 mt-10">
                        <span>{context?.userData.followers} followers</span>
                        <span>{context?.userData.following} following</span>
                    </div>
                </div>
                <div className="w-9/12 border-t-[1px] border-gray-600">
                    {pageContent.map((itm, index) => (
                        <PageItems
                            itm={itm}
                            index={index}
                            insideFolderFuncion={insideFolderFuncion}
                            codeFileFunction={codeFileFunction}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoldersPage;
