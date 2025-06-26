import React from "react";

function Order({prod, token}){
    const order_products = prod.products

    async function delorder(index){
        await fetch(`http://127.0.0.1:8000/order/${index}`,{
            method: 'DELETE',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        alert("Заказ отменён")
    }

    const product_result = order_products.map((order_product) => {
        return(
            <div className="card-body">
                <h4>{order_product.title}</h4>
                <h6>{order_product.price} р.</h6>
                <p>{order_product.description}</p>
            </div>
        )
    })

    return(
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h3 className="my-0 fw-normal">Идентификатор заказа: <b>{prod.id}</b></h3>
                </div>

                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{prod.order_price}р.</h1>
                    <button onClick={()=> delorder(prod.id)} type="button" className="btn btn-lg btn-outline-danger mb-3 bc-dark">Отменить</button>
                </div>
                <div>
                    {product_result}
                </div>
            </div>
        )
}

export default Order