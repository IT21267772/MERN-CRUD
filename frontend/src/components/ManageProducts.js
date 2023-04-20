import React from 'react'

//This line is importing the Axios library, which is used to make HTTP requests from the client-side in the browser or Node.js environment. 
//It allows the component to send GET, POST, PUT, DELETE requests to a server API to fetch and manipulate data.
import axios from 'axios'

//These functions are used for managing state and lifecycle events in React components. 
//useState allows creating and updating state variables, while useEffect allows running side effects (e.g., fetching data from an API) when the component mounts or updates.
import { useEffect, useState } from 'react';

//The Link component is used to create links between different routes in a React application.
import { Link } from 'react-router-dom';

//The toast allows displaying notification messages in the application.
import { toast } from 'react-hot-toast';

const ManageProducts = () => {

    // Declaring state variables with useState hooks
    const [ products, setProducts ] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Function to fetch products from the server
    const getProducts = async () => {
        // Send a GET request to the specified URL and wait for the response
        await axios.get('http://localhost:4005/products/')
        .then(res => {
            // Update the state with the received data
            setProducts(res.data)

            //You can observe the response by 
            //console.log(res.data)
        }).catch(err => alert(err))   
    }

    // Call the getProducts function when the component mounts or when isSubmitted changes
    useEffect(() => {
        getProducts()
    }, [isSubmitted])

    // Log the products state to the console - for testing
    console.log(products)
      
    // Function to delete a product
    const handleDelete = (id) => {
        // Send a DELETE request to the specified URL
        axios.delete('http://localhost:4005/products/' + id)
        .then(res => {
            // Show a success message using react-hot-toast and update the isSubmitted state variable 
            toast.success('Product deleted')

            /* toggles the isSubmitted state to its opposite value.
            It is used to trigger a re-render of the component and update the product list after a product is deleted.
            By changing the isSubmitted value, it forces the useEffect hook to re-run the getProducts function which retrieves the latest list of products from the server. */
            setIsSubmitted(!isSubmitted)

        }).catch(err => alert(err))   
    }

    return (
        <div>

            <table className='products'>
                <tr>
                <th className='hName'>Product Name</th>
                <th className='hPrice'>Price</th>
                <th className='hQty'>Quantity</th>
                <th className='hImg'>Image</th>
                <th className="hAction">Action</th>
                </tr>
                
                {
                    products.map(product => {
                        return(
                        <tr>
                            <td className='pName' >{product.productName}</td>
                            <td className='price'>{product.price}</td>
                            <td className='qty'>{product.quantity}</td>
                            <td className='image'><img src={product.image} style={{height: '30px', width: '30px', borderRadius: '50%'}} alt='No image'/></td>
                            <td className='action'>

                                <Link to= {'/viewProduct/' + product._id}>
                                    <button className='view'>View</button>
                                </Link>

                                <Link to= {'/editProduct/' + product._id}>
                                    <button className='update'>Edit</button>
                                </Link>
                                
                                <button className='delete' onClick={() => {handleDelete(product._id)}}>Delete</button>
                            </td>
                        </tr>
                        )
                    })
                }
            </table>
        </div>
  )
}

export default ManageProducts