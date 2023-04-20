import './App.css';
import AddProduct from './components/AddProduct';
import ManageProducts from './components/ManageProducts';
import EditProduct from './components/EditProduct';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ViewProduct from './components/ViewProduct';

function App() {

    return (
      <BrowserRouter>
            <Toaster />
      <div className="wrapper">
          
          <div className='top'>
              <Link to='/'>
                <button>Manage Products</button>
              </Link>
              <Link to='/addProduct'>
                <button>Add Product</button>
              </Link>
            </div>

            <div className='bottom'>

            <Routes>
              <Route path='/' element={<ManageProducts />} />
              <Route path='viewProduct/:id' element={<ViewProduct />} />
              <Route path='editProduct/:id' element={<EditProduct />} />
              <Route path='addProduct' element={<AddProduct />} />
            </Routes>

            </div>

      </div>
      </BrowserRouter>

    );
}

export default App;
