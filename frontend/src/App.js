import React from 'react';
import Navbar from './components/ui/navbar';
import Catalog from './components/pages/Catalog';
import Fabricators from './components/pages/Fabricators'
import Home from './components/pages/Home';
import {Route,Routes} from 'react-router-dom'
import CatalogCategorized from './components/pages/CatalogCategorized';
import CatalogDetails from './components/pages/CatalogDetails';
import Sales from './components/pages/Sales';
import CategoryForm from './components/forms/category';
import ProductForm from './components/forms/product';
import FabricatorForm from './components/forms/fabricator';
import SalesForm from './components/forms/sale';

function App() {

  return (
    <>
    <Navbar/>
    <div>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/catalog" element={<Catalog/>}></Route>
            <Route path="/catalog/create" element={<CategoryForm/>}></Route>
            <Route path="/catalog/create-product" element={<ProductForm/>}></Route>
            <Route path="/catalog/details/:productId" element={<CatalogDetails/>}></Route>
            <Route path="/catalog/details/edit/:productId" element={<ProductForm/>}></Route>
            <Route path="/catalog/categorized/:categoryId" element={<CatalogCategorized/>}></Route>
            <Route path="/fabricators" element={<Fabricators/>}></Route>
            <Route path="/fabricators/edit/:id" element={<FabricatorForm/>}></Route>
            <Route path="/fabricators/create" element={<FabricatorForm/>}></Route>
            <Route path="/sales" element={<Sales/>}></Route>
            <Route path="/sales/create" element={<SalesForm/>}></Route>
        </Routes>
    </div>
    </>

  );
}

export default App;