import MenuItem from "../Components/MenuItem";

const Dashboard = () => {

    const items = [
        {
            text: "Contratos",
            url: "/contracts"
        },
        {
            text: "Supervisores",
            url: "/supervisor"
        },
        {
            text: "Proveedores",
            url: "/providers"
        },
        {
            text: "Gestion Usuarios",
            url: "/users"
        }
    ]

    return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full mt-2">
                {
                    items.map(item => (
                        <MenuItem text={item.text} url={item.url} />
                    ))
                }
            </div>
    )
};




export default Dashboard;