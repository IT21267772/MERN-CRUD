import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useParams } from 'react-router-dom';


const ViewProduct = () => {

    // Get the id from the URL params
    const { id } = useParams()

    console.log(id) //for testing only

    const [productName, setProductname] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [price, setPrice] = useState(null)
    const [imageURL, setImageURL] = useState(null)


    //This part is very similar to edit function
    useEffect(() => {
        axios.get('http://localhost:4005/products/' + id).then(res => {
            setProductname(res.data.productName)
            setQuantity(res.data.quantity)
            setPrice(res.data.price)
            setImageURL(res.data.image)
        }).catch(err =>{
            alert(err.message)
        })
    }, [id])


    return (


        <div className='productCard'>      
            <h1>View Product</h1>

            <div style={{display: 'flex', justifyContent: 'center'}} >
            <img src={imageURL} height='140px' width='140px' />
            </div>

            <table>

            <tr>
                <td>Product Name</td>
                <td>{productName} </td>
            </tr>

            <tr>
                <td>Quantity</td>
                <td>{quantity} </td>
            </tr>

            <tr>
                <td>Price</td>
                <td>{price} </td>
            </tr>
            </table>

        </div>     
    )
}

export default ViewProduct