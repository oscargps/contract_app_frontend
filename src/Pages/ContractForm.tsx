import {
    Button,
    DatePicker,
    Input,
    AutocompleteItem,
    Textarea,
    Autocomplete,
    Chip,
    Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IProvider } from "../Types/IProvider";
import { ISupervisor } from "../Types/ISupervisor";
import SaveIcon from "../assets/icons/Save";
import { ContractSchema } from "../Validations/ContractSchema";
import { useMapLists } from "../Hooks/useMapLists";
import { Toaster, toast } from "sonner";
import { GetDuration, validateDates } from "../helpers/DateHelper";
import { useCreateContract } from "../Hooks/useContracts";


const ContractForm = () => {
    const [formData, setFormData] = useState<any>();
    const [errors, setErrors] = useState<any>();
    const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [supervisors, setSupervisors] = useState<ISupervisor[]>([]);
    const { mutate, isPending, isError, isSuccess } = useCreateContract()

    useMapLists(setProviders, setSupervisors, setCatalogs)

    useEffect(() => {
        getContractDuration()
        getDateValidation()
    }, [formData?.start_date, formData?.end_date])

    useEffect(() => {
        if (!isPending) {
            if (isSuccess) {
                toast.success("Nuevo contrato creado exitosamente!");
                setFormData({});
                setTimeout(() => {
                    window.location.assign('/')
                }, 2000)
            }
            if (isError) {
                toast.error("Hubo un error, intenta mas tarde!");
            }
        }
    }, [isPending])

    const addDataForm = (key: string, value: any) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = () => {
        try {
            ContractSchema.parse(formData)
            setErrors({})
            mutate(formData)
        } catch (error: any) {
            toast.error("Error: Información faltante o incorrecta");
            mapErrors(error)
        }
    }

    const mapErrors = (error: any) => {
        const errorResponse = JSON.parse(error.message);
        let formErrors = {}
        errorResponse.forEach((errorField: any) => {
            formErrors = {
                ...formErrors,
                [errorField.path[0]]: true
            }
        });
        setErrors(formErrors)
    }

    const getContractDuration = () => {
        addDataForm('duration', GetDuration(formData?.start_date, formData?.end_date))
    }
    const getDateValidation = () => {
        if (!validateDates(formData?.start_date, formData?.end_date)) {
            setErrors({
                ...errors,
                'start_date': true,
                'end_date': true,
            })
        } else {
            setErrors({
                ...errors,
                'start_date': false,
                'end_date': false,
            })
        }
    }


    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="m-5 flex gap-5 flex-col md:flex-row">
                <Input
                    label="N° de Contrato"
                    placeholder=" "
                    isClearable
                    isRequired
                    size="md"
                    type="text"
                    labelPlacement="outside"
                    radius="md"
                    name="contract_number"
                    isInvalid={Boolean(errors?.contract_number)}
                    value={formData?.contract_number}
                    onValueChange={(data) => {
                        addDataForm("contract_number", data);
                    }}
                />
                <Autocomplete
                    label="Proveedor"
                    placeholder="Seleccione..."
                    labelPlacement={"outside"}
                    className="w-8/12 rounded-md"
                    radius="md"
                    size="md"
                    isRequired
                    name="provider_id"
                    isDisabled={!(providers.length > 0)}
                    isInvalid={Boolean(errors?.provider_id)}
                    onSelectionChange={(data) => {
                        addDataForm("provider_id", data);
                    }}
                >
                    {providers.map((provider: IProvider) => (
                        <AutocompleteItem key={provider.provider_id} className="">
                            {`${provider.full_name} - ${provider.document_number}`}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className="m-5 flex gap-5 flex-col md:flex-row">
                <Textarea
                    label="Objeto del Contrato"
                    isRequired
                    size="md"
                    type="text"
                    placeholder="Buscar"
                    labelPlacement="outside"
                    radius="md"
                    name="purpose"
                    isInvalid={Boolean(errors?.purpose)}
                    value={formData?.purpose}
                    onValueChange={(data) => {
                        addDataForm("purpose", data);
                    }}
                />
                <Autocomplete
                    label="Supervisor"
                    placeholder="Seleccione..."
                    labelPlacement={"outside"}
                    className="w-8/12 rounded-md"
                    radius="md"
                    size="md"
                    isRequired
                    name="supervisor_id"
                    isInvalid={Boolean(errors?.supervisor_id)}
                    isDisabled={!(supervisors.length > 0)}
                    onSelectionChange={(data) => {
                        addDataForm("supervisor_id", data);
                    }}
                >
                    {supervisors.map((supervisor: ISupervisor) => (
                        <AutocompleteItem key={supervisor.supervisor_id} className="">
                            {supervisor.full_name}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className="m-5 flex gap-5 flex-col md:flex-row">
                <Textarea
                    label="Obligaciones Contractuales"
                    isRequired
                    size="md"
                    type="text"
                    placeholder=" "
                    labelPlacement="outside"
                    radius="md"
                    name="contractual_obligations"
                    className="w-full"
                    isInvalid={Boolean(errors?.contractual_obligations)}
                    value={formData?.contractual_obligations}
                    onValueChange={(data) => {
                        addDataForm("contractual_obligations", data);
                    }}
                />
                <Input
                    label="Valor Total"
                    isClearable
                    size="md"
                    type="number"
                    placeholder="$"
                    labelPlacement="outside"
                    radius="md"
                    name="total_value"
                    className="w-8/12"
                    isRequired
                    isInvalid={Boolean(errors?.total_value)}
                    value={formData?.total_value}
                    onValueChange={(data) => {
                        addDataForm("total_value", data);
                    }}
                />
            </div>
            <div className="m-5 flex gap-5 flex-col md:flex-row">
                <Autocomplete
                    label="Estado"
                    placeholder="Seleccione..."
                    labelPlacement={"outside"}
                    className="w-8/12 rounded-md"
                    radius="md"
                    size="md"
                    isRequired
                    name="status"
                    isInvalid={Boolean(errors?.status)}
                    isDisabled={!(catalogs.length > 0)}
                    onSelectionChange={(data) => {
                        addDataForm("status", data);
                    }}
                >
                    {catalogs.filter((catalog: ICatalog) => catalog.type == "contract_status").map((catalog: ICatalog) => (
                        <AutocompleteItem key={catalog.id} className="">
                            {catalog.value}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Input
                    label="Valor Mensual"
                    isClearable
                    size="md"
                    type="number"
                    placeholder="$"
                    labelPlacement="outside"
                    className="w-8/12"
                    radius="md"
                    isRequired
                    name="monthly_value"
                    isInvalid={Boolean(errors?.monthly_value)}
                    value={formData?.monthly_value}
                    onValueChange={(data) => {
                        addDataForm("monthly_value", data);
                    }}
                />
            </div>
            <div className="m-5 flex gap-5 flex-col md:flex-row">
                <DatePicker
                    isRequired
                    name="start_date"
                    labelPlacement="outside"
                    label="Fecha de inicio"
                    className="max-full"
                    isInvalid={Boolean(errors?.start_date)}
                    onChange={(data) => {
                        addDataForm("start_date", data.toDate('America/Bogota').toISOString().split('T')[0]);
                    }}
                />
                <DatePicker
                    isRequired
                    name="end_date"
                    labelPlacement="outside"
                    label="Fecha de finalización"
                    className="max-full"
                    isInvalid={Boolean(errors?.end_date)}
                    onChange={(data) => {
                        addDataForm("end_date", data.toDate('America/Bogota').toISOString().split('T')[0]);
                    }}
                />
            </div>
            {formData?.duration && <div>
                Duración:     <Chip>{formData?.duration}</Chip>
            </div>}
            <div className="flex justify-center m-16" >
                {(isPending && catalogs.length) ?
                    <Spinner size="lg" /> :
                    <Button color="default" size="md" endContent={<SaveIcon />} onPress={handleSubmit}>
                        Guardar
                    </Button>}
            </div>
        </>
    );
};

export default ContractForm;
