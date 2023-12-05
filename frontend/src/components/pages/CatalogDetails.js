import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Goods from '../props/goods'
import style from './container.module.css'
import Button from '../ui/button';
function CatalogDetails() {
    const {productId} = useParams();
    const [data, setData] = useState({});
    const url = `/api/goods/details/${productId}`;
    const token = sessionStorage.getItem("accessToken");
    const fetchInfo = () => { 
      return axios.get(url) 
              .then((res) => setData(res.data)) 
      }
      
      useEffect(() => {
        fetchInfo();
      }, [])

      function deleter(){
        axios.delete(`/api/goods/${data._id}`);
      }


  return (
    <div className={style.flexC}>
    <div className={style.borderedContainer}>
      <Goods article={data.article} name={data.name} price={data.price} categoryId={data.categoryId} fabricatorId={data.fabricatorId}/>
    </div>
    <div className={style.flexR} style={{justifyContent:'space-between'}}>
    <div className={style.flexR}>
      {token?<Button text='Edit' link={`/catalog/details/edit/${data._id}`}/>:''}

    <Button text='Back' link={`/catalog/categorized/${data.categoryId}`}/>
    </div>
    {token?<Button text='Delete' link={`/catalog/categorized/${data.categoryId}`} clickfunc={deleter}/>:''}
    </div>
    </div>

  );
}

export default CatalogDetails;