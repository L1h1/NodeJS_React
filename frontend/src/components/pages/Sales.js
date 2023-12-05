import React, { useState, useEffect } from 'react';
import axios from 'axios'
import style from './container.module.css'
import Button from '../ui/button';
import uiStyle from '../ui/button.module.css'
function Sales() {
  const [data, setData] = useState([{}]);
  const [searchResults, setSearchResults] = useState([{}]);
  const [idSortMode,setIdSortMode] = useState();
  const [amountSortMode,setAmountSortMode] = useState();
  const [priceSortMode,setPriceSortMode] = useState();
  const [totalSortMode,setTotalSortMode] = useState();
  const [dateSortMode,setDateSortMode] = useState();
  const token = sessionStorage.getItem("accessToken");
  const url = 'api/sales';

  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo().then(()=>setSearchResults(data)).then(()=>setAmountSortMode(true))
      .then(()=>setPriceSortMode(true)).then(()=>setTotalSortMode(true)).then(()=>setDateSortMode(true));
    }, [])

    function onSearchChange(e){
      var val = e.target.value;

      setSearchResults(data.filter((obj)=>{
        return obj.carPartId.toUpperCase().includes(val.toUpperCase()) 
        || obj.totalPrice.toString().includes(val)
        || obj.amount.toString().includes(val)
        || obj.pricePerPiece.toString().includes(val)
        || obj.createdAt.toString().includes(val);
      }));
    }
    function orderById(){
      if(idSortMode){
        setIdSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          const nameA = a._id.toUpperCase(); 
          const nameB = b._id.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }));
        
      }else{
        setIdSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }

    function orderByPricePerPiece(){
      if(priceSortMode){
        setPriceSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          return b.pricePerPiece-a.pricePerPiece
        }));
        
      }else{
        setPriceSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }

    function orderByAmount(){
      if(amountSortMode){
        setAmountSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          return b.amount-a.amount
        }));
        
      }else{
        setAmountSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }
    function orderByTotalPrice(){
      if(totalSortMode){
        setTotalSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          return b.totalPrice-a.totalPrice
        }));
        
      }else{
        setTotalSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }
    function orderByDate(){
      if(dateSortMode){
        setDateSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          const nameA = a.createdAt.toUpperCase(); 
          const nameB = b.createdAt.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }));
        
      }else{
        setDateSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }
  return (
    <>
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
    <div className={style.flexR}>
        <input type='text' className={uiStyle.btn} onChange={onSearchChange}/>
        <Button text='Order by id' clickfunc={orderById}/>
        <Button text='Order by price per piece' clickfunc={orderByPricePerPiece}/>
        <Button text='Order by amount' clickfunc={orderByAmount}/>
        <Button text='Order by total price' clickfunc={orderByTotalPrice}/>
        <Button text='Order by date' clickfunc={orderByDate}/>
      </div>
    {token?<Button text='Create' link='/sales/create'/>:''}
      </div>
      <table style={{ border: '2px solid white', borderCollapse: 'collapse'}}>
      <thead>
        <tr>
          <th style={{ border: '2px solid white', padding: '8px' }}>transaction id</th>
          <th style={{ border: '2px solid white', padding: '8px' }}>productId</th>
          <th style={{ border: '2px solid white', padding: '8px' }}>price per piece</th>
          <th style={{ border: '2px solid white', padding: '8px' }}>amount</th>
          <th style={{ border: '2px solid white', padding: '8px' }}>total price</th>
          <th style={{ border: '2px solid white', padding: '8px' }}>created at</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((row, rowIndex) => (
          <tr>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row._id}
            </td>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row.carPartId}
            </td>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row.pricePerPiece}
            </td>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row.amount}
            </td>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row.totalPrice}
            </td>
            <td style={{ border: '2px solid white', padding: '8px' }}>
              {row.createdAt}
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>

    </>
  );
}

export default Sales;