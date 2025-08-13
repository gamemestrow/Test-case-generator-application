/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

const Repos = ( {userRepos} ) => {
    return (
        <>
            <span>
                <h1 className="text-blue-500 text-2xl">
                    <b>{userRepos.name}</b>
                </h1>
                <div className="w-fit px-3 border-[2px] border-gray-600 mt-2 rounded-full">
                    {userRepos.visibility}
                </div>
            </span>
            <span className="text-2xl">{userRepos.stargazers_count} stars</span>
        </>
    );
};

export default Repos;