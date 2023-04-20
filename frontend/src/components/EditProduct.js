import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Function for uploading image
//When you pass a file as prop, it'll return image URL after uploading to firebase cloud storage
import uploadImage from '../uploadImage';

//The toast allows displaying notification messages in the application.
import { toast } from 'react-hot-toast';


const EditProduct = () => {

    // Get the id from the URL params
    const { id } = useParams()

    // Define navigate to redirect to other pages
    const navigate = useNavigate()

    console.log(id) // for testing, you can viw this in chrome console by clicking inspect

    // Initialize states
    const [productName, setProductname] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [price, setPrice] = useState(null)
    const [file, setFile] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    // This useEffect hook is used to make an API call to fetch a single product based on the id parameter passed in the URL.
    useEffect(() => {
        axios.get('http://localhost:4005/products/' + id).then(res => {
            // It sets the states for productName, quantity, price, and imageURL based on the response data received.
            setProductname(res.data.productName)
            setQuantity(res.data.quantity)
            setPrice(res.data.price)
            setImageURL(res.data.image)
            
        }).catch(err =>{// If there is an error while fetching the data, an alert is displayed with the error message.
            alert(err.message)
        })
    }, [id])// The useEffect hook will re-run only if the 'id' parameter changes.


    const handleSubmit = async (e) => {
        e.preventDefault()

        //If the user has uploaded an image, then update it to cloud storage and use the new URL
        if (file) {
            // Call the uploadImage function to get the image URL for new image
            const URL = await uploadImage(file)

            //PUT request for updating
            axios.put("http://localhost:4005/products/" + id, {productName, price, quantity, image: URL})
            .then(res => {
                toast.success('Product updated')
                //console.log(res) //for testing
                setProductname(null)
                setPrice(null)
                setQuantity(null)
                setFile(null)

                //Upon successful update, navigate to manageProducts page.
                //You can see the route in App.js
                navigate('/')
            })
            .catch(err => {
                alert(err)
            })
        }
        //Else use the existing image url and skip uploading image to cloud DB
        else {
            axios.put("http://localhost:4005/products/" + id, {productName, price, quantity, image: imageURL})
            .then(res => {
                toast.success('Product updated')
                console.log(res)
                setProductname(null)
                setPrice(null)
                setQuantity(null)
                setFile(null)
                navigate('/')
            })
            .catch(err => {
                alert(err)
            })
        }
    }

    return (


        <form className="productForm">
            
            <h1>Edit Product</h1>

            <div style={{display: 'flex', justifyContent: 'center'}} >
            <img src={imageURL} height='80px' width='80px' />
            </div>

            <label>Product Name</label>
            <input name='productName' value={productName} onChange={(e) => setProductname(e.target.value)} />

            <label>Quantity</label>
            <input name='quantity' type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            <label>Price</label>
            <input name='price' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />

            <label>Image</label>
            <input name='image' type='file' accept='.png, .jpeg, .jpg, .webp' onChange={(e) => setFile(e.target.files[0])} />

            <button onClick={handleSubmit}>Update</button>

        </form> 
    )
}

export default EditProduct