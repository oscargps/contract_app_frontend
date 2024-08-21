import { ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    detenido: "danger",
    retrasado: "warning",
};