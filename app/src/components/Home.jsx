import React from "react";
import Cart from "./Cart";

function Home({login, token}){
    const [prodCategories, setProdCategories] = React.useState([])
    const [cartProd, setCartProd] = React.useState([])

    async function GettindProd(){
        const api_url = await fetch("http://127.0.0.1:8000/products")
        const data = await api_url.json()
        setProdCategories(data.data)
    }

    async function addCart(index, cat_id){
        console.log(index, cat_id);
        
        await fetch(`http://127.0.0.1:8000/cart/${cat_id}/${index}`,{
            method: 'POST',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
    }
    

    React.useEffect(() => {
        GettindProd()}, [])

    let result = []

    prodCategories.map((prod_cat) => {
                                   
        result.push (prod_cat.map((prod) => {                        
            return(
                <div>
                    <div className="prod-cart">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h3 className="my-0 fw-normal">{prod.title}</h3>
                            </div>
                            <div className="card-body">
                                <h5>{prod.description}</h5>
                                <b className="card-title pricing-card-title">{prod.price}р.</b>
                                {login ? <button onClick={()=> {addCart(prod.id, prod.category)}} type="button" className="w-100 btn btn-lg btn-outline-success">Добавить в корзину</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }))
    })
    

    

    return(
        <div>
            <h1 className="pricing-header p-3 pb-md-4 mx-auto text-center">Каталог Товаров</h1>
            {result}
        </div>
    )
}

export default Home