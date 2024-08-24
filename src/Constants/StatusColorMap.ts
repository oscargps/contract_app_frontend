import { ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Embargado: "danger",
    Inactivo: "warning",
};