import React, {useState,useEffect} from 'react';
import axios from 'axios'
import { Link,useParams } from 'react-router-dom';
import style from './container.module.css'
import Button from '../ui/button';

function CatalogCategorized() {
  let {categoryId} = useParams();
  const [data, setData] = useState([{}]);
  const url = `/api/goods/${categoryId}`;


  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo();
    }, [])
  


  return (
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
      <div className={style.flexC} style={{margin:'0px'}}>
        {
          data.map((obj,index)=>{
            return(
              <div className={style.flexR} style={{width:'90%',justifyContent:'space-between'}}>
                  <p class={style.borderedContainer}>Article: {obj.article} Name:{obj.name} Price:{obj.price}</p>
                  <Button text='Details' link={`/catalog/details/${obj._id}`}/>
              </div>
            )
          })
          
        }
        
      </div>
      <Button text='Create' link='/catalog/create-product'/>
    </div>
   
  );
}

export default CatalogCategorized;