import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react';

//Function for uploading image
//When you pass a file as prop, it'll return image URL after uploading to firebase cloud storage
import uploadImage from '../uploadImage';

//The toast allows displaying notification messages in the application.
import { toast } from 'react-hot-toast';

const AddProduct = () => {

    const [productName, setProductname] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [price, setPrice] = useState(null)
    const [file, setFile] = useState(null)

    // Define function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent page refresh on form submission
        e.preventDefault()

        // Call the uploadImage function to get the image URL
        const imageURL = await uploadImage(file);

        // Send a POST request to the server to add the product with the form data and the uploaded image URL
        axios.post("http://localhost:4005/products", {productName, price, quantity, image: imageURL}).
        then(res => {
            // If successful, display a success toast notification
            toast.success('Product added')

            // If successful, clear the input fields and file input
            setProductname('')
            setPrice('')
            setQuantity('')
            setFile(null)
            // Clear the value of the file input field
            document.getElementById('file-input').value = '';
        }).catch(err => {
            console.log(err.message);
    
            alert(err.message);
        })
    }    
    

    return (
        <form className="productForm">

            <h1>Add Product</h1>

            <label>Product Name</label>
            <input name='productName' value={productName} onChange={(e) => setProductname(e.target.value)} />

            <label>Quantity</label>
            <input name='quantity' type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            <label>Price</label>
            <input name='price' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />

            
            <label>Image</label>
            <input name='image' id="file-input" type='file' accept='.png, .jpeg, .jpg, .webp' onChange={(e) => setFile(e.target.files[0])} />

            <button onClick={handleSubmit}>Submit</button>

        </form> 
    )
}

export default AddProduct