import React from "react";

function Home({login,token}){
    const [prod, setProd] = React.useState([])
    async function GettindProd(){
        const api_url = await fetch("http://127.0.0.1:8000/prods")
        const data = await api_url.json()
        console.log(data);
        setProd(data.data)
    }

    async function addCart(index){
        const api_url = await fetch(`http://127.0.0.1:8000/cart/${index}`,{
            method: 'POST',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
    }
    


    

    React.useEffect(() => {GettindProd()}, [])

    const result = prod.map((prod) => {
        return(
            <div>
                <div className="prod-cart">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h3 className="my-0 fw-normal">{prod.name}</h3>
                        </div>
                        <div className="card-body">
                            <h5>{prod.description}</h5>
                            <b className="card-title pricing-card-title">{prod.price}р.</b>
                            {login ? <button onClick={()=> {addCart(prod.id)}} type="button" className="w-100 btn btn-lg btn-outline-success">Добавить в корзину</button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div>
            <h1 className="pricing-header p-3 pb-md-4 mx-auto text-center">Каталог Товаров</h1>
            {result}
        </div>
    )
}

export default Home