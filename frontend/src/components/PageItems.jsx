import React from "react";

const PageItems = ({ itm, index, insideFolderFuncion, codeFileFunction }) => {
    return (
        <div
            onClick={
                itm.type == "dir" ? () => insideFolderFuncion(itm.path) : () => codeFileFunction(itm.path)
            }
            key={index}
            className="w-full h-20 border-b-[1px] border-gray-600 flex items-center justify-between px-10 "
        >
            <img
                src={
                    itm.type == "file"
                        ? "./icons8-file-100.png"
                        : "./icons8-directory-96.png"
                }
                className="w-10"
                alt=""
            />
            <span className="w-40 font-bold">{itm.name}</span>
            <span></span>
        </div>
    );
};

export default PageItems;
