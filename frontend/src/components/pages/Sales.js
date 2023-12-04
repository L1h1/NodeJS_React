import React, { useState, useEffect } from 'react';
import axios from 'axios'
import style from './container.module.css'
import Button from '../ui/button';
function Sales() {
  const [data, setData] = useState([{}]);
  const url = 'api/sales';

  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo();
    }, [])

  return (
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
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
        {data.map((row, rowIndex) => (
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
      <Button text='Create' link='/sales/create'/>
    </div>
   
  );
}

export default Sales;