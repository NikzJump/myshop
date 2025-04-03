import React from "react";

function Order({token}){
    const [prods, setProds] = React.useState([])
    async function GettindProd(){
        const api_url = await fetch("http://127.0.0.1:8000/order",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await api_url.json()
        console.log(data);
        setProds(data.data)
    }
    React.useEffect(() => {GettindProd()}, [])

    const result = prods.map((prod) => {
        return(
            <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{prod.id}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">{prod.order_price}р.<small className="text-muted fw-light"> &times; {prods.length} шт.</small></h1>
                        <p>{prod.description}</p>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div>
            {result}
        </div>
    )
}

export default Order