import { useNavigate } from "react-router-dom";


const MenuItem = (props: any) => {
    const { text, url } = props;
    const navigate = useNavigate()


    return (
        <div className="bg-gray-200 p-4 flex items-center justify-center rounded-lg text-center py-20 hover:cursor-pointer hover:bg-gray-400"
            onClick={() => navigate(url)}
        >
            <span className="text-2xl">{text}</span>
        </div>
    );
};

export default MenuItem;
