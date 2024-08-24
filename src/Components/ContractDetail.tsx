import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Textarea, Spinner } from "@nextui-org/react";
import TableTemplate from "./TableTemplate";
import { statusColorMap } from "../Constants/StatusColorMap";
import { GetDurationInMonths } from "../helpers/DateHelper";
import { useGetContractExtensions } from "../Hooks/useContracts";
import { toast } from "sonner";

const columns = [
    { name: "Proveedor", uid: "provider" },
    { name: "Supervisor", uid: "supervisor" },
    { name: "Valor Total", uid: "total_value" },
    { name: "Valor Mensual", uid: "monthly_value" },
    { name: "Fecha de inicio", uid: "start_date" },
    { name: "Fecha de finalización", uid: "end_date" },
    { name: "Duracion", uid: "duration" },
    { name: "Estado", uid: "status" },
];
const columnsExtensions = [
    { name: "N° Prorroga", uid: "extension_number" },
    { name: "Valor Adicional", uid: "additional_value" },
    { name: "Fecha de inicio", uid: "extension_start_date" },
    { name: "Fecha de finalización", uid: "extension_end_date" },
    { name: "Duracion", uid: "duration" },
    { name: "Estado", uid: "status" },

];

const ContractDetail = (props: any) => {

    const { isOpen, onOpenChangeFn, contract } = props
    const [extensions, setExtensions] = useState<any>([]);

    const { data, isSuccess, refetch, isFetching, isError } =
        useGetContractExtensions(contract[0]?.contract_id);

    useEffect(() => {
        if (isSuccess && !isFetching) {
            setExtensions(data);
        } else if (isError && !isFetching) {
            toast.error("Error: No se pudieron obtener las prorrogas");
            setExtensions([])
        }
    }, [isFetching]);

    useEffect(() => {
        if (isOpen) {
            refetch()
        }
    }, [isOpen])
    const renderCellExtensions = React.useCallback(
        (extension: any, columnKey: React.Key) => {
            const cellValue = extension[columnKey as keyof any];
            switch (columnKey) {
                case "status":
                    const active_extension = extension.status == "1"
                    return (
                        <Chip
                            className="capitalize"
                            color={active_extension ? "success" : "warning"}
                            size="sm"
                            variant="flat"
                        >
                            {active_extension ? "Activa" : "Inactiva"}
                        </Chip>
                    );
                case "duration":
                    return GetDurationInMonths(extension.extension_end_date, extension.extension_start_date)
                default:
                    return cellValue;
            }
        },
        []
    );
    const renderCell = React.useCallback(
        (contract: any, columnKey: React.Key) => {
            const cellValue = contract[columnKey as keyof any];
            switch (columnKey) {
                case "status":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[contract.status_value.value]}
                            size="sm"
                            variant="flat"
                        >
                            {contract.status_value.value}
                        </Chip>
                    );
                case "provider":
                    return contract.provider.full_name;
                case "supervisor":
                    return contract.supervisor.full_name;
                case "duration":
                    return GetDurationInMonths(contract.end_date, contract.start_date)
                default:
                    return cellValue;
            }
        },
        []
    );
    return (
        <div className="w-full">
            <Modal size="5xl" isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChangeFn}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle de contrato N° {contract[0].contract_number}</ModalHeader>
                            <ModalBody>
                                <TableTemplate
                                    columns={columns}
                                    data={contract}
                                    renderCell={renderCell}
                                    id={"contract_id"}
                                />
                                <Textarea
                                    label="Objeto del Contrato"
                                    size="md"
                                    type="text"
                                    labelPlacement="outside"
                                    radius="md"
                                    name="purpose"
                                    isReadOnly
                                    value={contract[0].purpose}

                                />
                                <Textarea
                                    label="Obligaciones Contractuales"
                                    isReadOnly
                                    size="md"
                                    type="text"
                                    labelPlacement="outside"
                                    radius="md"
                                    name="contractual_obligations"
                                    value={contract[0].contractual_obligations}

                                />
                                <h1>Prorrogas</h1>
                                {isFetching && <Spinner />}
                                {extensions.length > 0 &&
                                    <TableTemplate
                                        columns={columnsExtensions}
                                        data={extensions}
                                        renderCell={renderCellExtensions}
                                        id={"contract_id"}
                                    />}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="light" onPress={onClose}>
                                    Agregar Prorroga
                                </Button>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Editar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ContractDetail
