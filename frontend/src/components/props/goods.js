import React from "react"
function Goods(props){
    return <div>
        <p>Article: {props.article}</p>
        <p>Name: {props.name}</p>
        <p>Price: {props.price}</p>
        <p>Category: {props.categoryId}</p>
        <p>Fabricator: {props.fabricatorId}</p>
    </div>
}
Goods.defaultProps = {
    article:"undefined",
    name:"undefined",
    price:"undefined",
    categoryId:"undefined",
    fabricatorId:"undefined",
}
export default Goods;