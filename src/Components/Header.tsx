import { Button } from "@nextui-org/react";
import HomeIcon from "../assets/icons/Home";
import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="flex p-1 h-1/6 border-b-2 border-black justify-between items-center">

                <div className="flex w-max">
                    <Button isIconOnly size="lg" color="primary" variant="light" aria-label="Like" onClick={() => navigate("/")}>
                        <HomeIcon />
                    </Button>

                </div>
                <div>

                    <h1 className="text-3xl">ContractApp</h1>
                </div>
                <div className="flex w-max space-x-4 items-center">
                    <h1>Jorge Padilla</h1>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

                </div>
            </div>

        </>
    )

}

export default Header;