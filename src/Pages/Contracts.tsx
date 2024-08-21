import {
    Chip,
    Tooltip,
    Input,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import EyeIcon from "../assets/icons/Eye";
import TableTemplate from "../Components/TableTemplate.tsx";
import SearchIcon from "../assets/icons/Search.tsx";
import AddIcon from "../assets/icons/Add.tsx";
import { useGetContract } from "../Hooks/useContracts.ts";
import queryClient from "../../query-client.ts";
import { Toaster, toast } from "sonner";
import { statusColorMap } from "../Constants/StatusColorMap.ts";
import ArrowUpIcon from "../assets/icons/ArrowUp.tsx";
import { useNavigate } from "react-router-dom";

const columns = [
    { name: "N° Contrato", uid: "contract_number" },
    { name: "Objeto del contrato", uid: "purpose" },
    { name: "Proveedor", uid: "provider" },
    { name: "Supervisor", uid: "supervisor" },
    { name: "Valor Total", uid: "total_value" },
    { name: "Duracion", uid: "duration" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
];

const Contracts = () => {
    const SearchOptions = [
        { value: "provider_id", label: "Nit o CC" },
        { value: "contract_number", label: "N° Contrato" },
    ];
    const [isValidationError, setValidationError] = useState(false);
    const [searchedContract, setSearchedContract] = useState<any>([]);
    const navigate = useNavigate()
    const [dataToSearch, setDataToSearch] = useState({
        criteria: SearchOptions[0].value,
        data: "",
    });

    const { data, isSuccess, refetch, isFetching, isError } =
        useGetContract(dataToSearch.criteria, dataToSearch.data);

    useEffect(() => {
        if (isSuccess && !isFetching) {
            setSearchedContract(data);
        } else if (isError && !isFetching) {
            toast.error("Error: Contrato no encontrado");
            setSearchedContract([])
        }
    }, [isFetching]);

    const handleSubmit = async () => {
        await queryClient.invalidateQueries();
        setDataToSearch({
            ...dataToSearch,
            data: "",
        });
        if (!dataToSearch.criteria || !dataToSearch.data) {
            setValidationError(true);
        } else {
            setValidationError(false);
            refetch();
        }
    };

    const renderCell = React.useCallback(
        (contract: any, columnKey: React.Key) => {
            const cellValue = contract[columnKey as keyof any];
            switch (columnKey) {
                case "status":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[contract.status]}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue}
                        </Chip>
                    );
                case "provider":
                    return contract.provider.full_name;
                case "supervisor":
                    return contract.supervisor.full_name;
                case "actions":
                    return (
                        <div className=" flex items-center justify-center">
                            <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="flex items-center justify-between gap-4 p-5 ">
                <h1>Contratos</h1>
                <div className="w-2/6 flex items-center">
                    <Select
                        className="w-8/12 rounded-md"
                        radius="none"
                        size="md"
                        isRequired
                        isInvalid={isValidationError}
                        classNames={{
                            trigger: "rounded-l-lg",
                        }}
                        defaultSelectedKeys={[dataToSearch.criteria]}
                        onChange={(data) => {
                            setDataToSearch({
                                ...dataToSearch,
                                criteria: data.target.value,
                            });
                        }}
                    >
                        {SearchOptions.map((option) => (
                            <SelectItem key={option.value} className="">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        isClearable
                        size="md"
                        type="text"
                        placeholder="Buscar"
                        labelPlacement="outside"
                        radius="none"
                        name="contract"
                        isInvalid={isValidationError}
                        classNames={{ inputWrapper: " rounded-r-lg" }}
                        value={dataToSearch.data}
                        onValueChange={(data) => {
                            setDataToSearch({
                                ...dataToSearch,
                                data,
                            });
                        }}
                    />
                    <Button
                        onPress={handleSubmit}
                        isIconOnly
                        size="lg"
                        color="default"
                        variant="light"
                        aria-label="Like"
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <Button color="default" startContent={<AddIcon />} onPress={()=>navigate("/contracts/new")}>
                    Nuevo
                </Button>
            </div>
            {isFetching && <div className="loader h-28 w-28 mx-auto my-4"></div>}
            {searchedContract.length ? (
                <TableTemplate
                    columns={columns}
                    data={searchedContract}
                    renderCell={renderCell}
                    id={"contract_id"}
                />
            ) : (
                <div className="flex flex-col items-center m-2">
                    <ArrowUpIcon />
                    <h1 className="mt-2 text-center text-gray-500">Busca un contrato en el campo de arriba</h1>
                </div>
            )}
        </>
    );
};
export default Contracts;
