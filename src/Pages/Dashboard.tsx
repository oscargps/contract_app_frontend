import MenuItem from "../Components/MenuItem";

const Dashboard = () => {

    const items = [
        {
            id:"1",
            text: "Contratos",
            url: "/contracts"
        },
        {
            id:"2",
            text: "Supervisores",
            url: "/supervisor"
        },
        {
            id:"3",
            text: "Proveedores",
            url: "/providers"
        },
        {
            id:"4",
            text: "Gestion Usuarios",
            url: "/users"
        }
    ]

    return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full mt-2">
                {
                    items.map(item => (
                        <MenuItem key={item.id} text={item.text} url={item.url} />
                    ))
                }
            </div>
    )
};




export default Dashboard;