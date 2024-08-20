import { Input, Button, Select, SelectItem } from "@nextui-org/react";

import SearchIcon from "../assets/icons/Search.tsx";
import AddIcon from "../assets/icons/Add.tsx";


const Contracts = () => {
    const SearchOptions = [
        { value: "nit", label: "Nit o CC" },
        { value: "contract", label: "N° Contrato" }
    ]
    return (
        <>
            <div className="flex items-center justify-between gap-4 p-5 ">
                <h1>Contratos</h1>
                <div className="w-2/6 flex items-center">
                    <Select
                        className="w-6/12 rounded-md"
                        radius="none"
                        size="md"
                        isRequired
                        classNames={{
                            trigger: "rounded-l-lg"
                        }}
                        defaultSelectedKeys={[SearchOptions[0].value]}
                    >
                        {SearchOptions.map((option) => (
                            <SelectItem key={option.value} className="">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        className=""
                        size="md"
                        type="number"
                        placeholder="Buscar"
                        labelPlacement="outside"
                        radius="none"
                        classNames={
                            {
                                inputWrapper: " rounded-r-lg"
                            }
                        }


                    />
                    <Button isIconOnly size="lg" color="default" variant="light" disableAnimation aria-label="Like" >
                        <SearchIcon />
                    </Button>
                </div>
                <Button color="primary" endContent={<AddIcon />}>
                    Nuevo
                </Button>
            </div>
        </>
    );
}
export default Contracts