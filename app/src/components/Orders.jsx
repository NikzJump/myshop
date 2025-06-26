import React from "react";
import Order from "./Order";
import { Link } from "react-router-dom";

function Orders({token}){
    const [prods, setProds] = React.useState([])
    const [orderClick, setOrderClick] = React.useState(0)

    async function GettindProd(){
        const api_url = await fetch("http://127.0.0.1:8000/orders",{
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
                <Order prod = {prod} token={token}/>
            </div>
        )
    })
 
    return(
        <div>
            <h4 className="pricing-header p-3 pb-md-4 mx-auto text-center">Текущие заказы</h4>
            {result}
        </div>
    )
}

export default Orders

{/* <div className="card mb-4 rounded-3 shadow-sm">
<div className="card-header py-3">
    <h3 className="my-0 fw-normal">Идентификатор заказа: <b>{prod.id}</b></h3>
</div>

<div className="card-body">
    <h1 className="card-title pricing-card-title">{prod.order_price}р.</h1>
    <p>{prod.description}</p>
    <button onClick={()=> delorder(prod.id)} type="button" className="btn btn-lg btn-outline-danger mb-3 bc-dark">Отменить</button>
</div>
</div> */}