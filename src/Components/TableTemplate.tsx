import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


const TableTemplate = (props: any) => {
    const { columns, data, id, renderCell } = props;
    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data}>
                {(item: any) => (
                    <TableRow key={item[id]}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )

}

export default TableTemplate;