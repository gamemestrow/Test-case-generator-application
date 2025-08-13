import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const SummaryPage = () => {
    const location = useLocation();
    const [summary, setsummary] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            const codefromloc = location.state?.code;
            const data = await axios.post(
                "http://localhost:3000/api/test/summary",
                { code: codefromloc || "" }
            );
            setsummary(data.data.summary);
        };
        fetchSummary();
    }, []);

    return (
        <div>
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
    );
};

export default SummaryPage;
