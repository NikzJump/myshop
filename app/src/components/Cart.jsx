import React from "react";

function Cart({token}){
    const [prod, setProd] = React.useState([])
    const [count, setCount] = React.useState(0)

    async function GettindProd(){
        const api_url = await fetch("http://127.0.0.1:8000/cart",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await api_url.json()
        console.log(data);
        setProd(data.data)
    }
    React.useEffect(() => {GettindProd()}, [])

    async function delcart(index){
        const api_url = await fetch(`http://127.0.0.1:8000/cart/${index}`,{
            method: 'DELETE',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        GettindProd()
    }

    async function addOrder(){
        fetch(`http://127.0.0.1:8000/orders`,{
            method: 'POST',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        alert('Заказ оформлен')
        GettindProd()
    }

    let res = []

    for (let pro of prod){
        if(!res.find(data => data.product_id === pro.product_id)){
            res.push({...pro, count: 1})
        }
        else{
            res.find(data => data.product_id === pro.product_id).count+=1
        }
    }

    const result = res.map((prod) => {
        return(
            <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{prod.name}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">{prod.price}р.</h1>
                        <p>{prod.name}</p>
                        <button onClick={()=> delcart(prod.product_id)} type="button" className="btn btn-lg btn-outline-danger mb-3">delete</button>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div>
            {prod.length == 0 ? <h4 className="pricing-header p-3 pb-md-4 mx-auto text-center">Корзина пуста</h4> : result}
            {prod.length>0 ? <button type="button" class="col-6 btn btn-lg btn-primary mb-3" onClick={()=> addOrder()}>Оформить зваказ</button> : ''}
        </div>
    )
}

export default Cart