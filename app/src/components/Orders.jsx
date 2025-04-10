import React from "react";
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

    async function delorder(index){
        const api_url = await fetch(`http://127.0.0.1:8000/order/${index}`,{
            method: 'DELETE',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        GettindProd()
    }

    const orderInfo = (prod) =>{      
        prod.map((data_prod) => {
            
            setOrderClick(
                <div>
                    <div>
                        <h5>{data_prod.name}</h5>
                        <p >{data_prod.description}</p>
                        <b >{data_prod.price}p.</b>
                    </div>
                </div>
            )
        })
    }


    const result = prods.map((prod) => {
        return(
            <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <button className="btn" onClick={() => orderInfo(prod.products)}><h3 className="my-0 fw-normal">Идентификатор заказа: <b>{prod.id}</b></h3></button>
                        {orderClick}
                    </div>

                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">{prod.order_price}р.</h1>
                        <p>{prod.description}</p>

                        <button onClick={()=> delorder(prod.id)} type="button" className="btn btn-lg btn-outline-danger mb-3 bc-dark">Отменить</button>
                    </div>
                </div>
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