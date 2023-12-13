import React, {useState,useEffect} from 'react';
import axios from 'axios'
import { Link,useParams } from 'react-router-dom';
import style from './container.module.css'
import Button from '../ui/button';
import uiStyle from '../ui/button.module.css'
function CatalogCategorized() {
  let {categoryId} = useParams();
  const [data, setData] = useState([{}]);
  const [searchResults, setSearchResults] = useState([{}]);
  const [nameSortMode,setNameSortMode] = useState();
  const [articleSortMode,setArticleSortMode] = useState();
  const [priceSortMode,setPriceSortMode] = useState();
  const url = `/api/goods/${categoryId}`;
  const token = sessionStorage.getItem("accessToken");

  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo()
      .then(()=>setArticleSortMode(true)).then(()=>setNameSortMode(true))
      .then(()=>setPriceSortMode(true));
    }, [])

    useEffect(() => {
      setSearchResults(data);

    }, [data])
  
    function onSearchChange(e){
      var val = e.target.value;

      setSearchResults(data.filter((obj)=>{
        return obj.name.toUpperCase().includes(val.toUpperCase()) 
        || obj.article.toUpperCase().includes(val.toUpperCase())
        || obj.price.toString().includes(val);
      }));
    }
    function orderByName(){
      if(nameSortMode){
        setNameSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase(); 
          const nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }));
        
      }else{
        setNameSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }

    function orderByArticle(){
      if(articleSortMode){
        setArticleSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          const nameA = a.article.toUpperCase(); 
          const nameB = b.article.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }));
        
      }else{
        setArticleSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }
    function orderByPrice(){
      if(priceSortMode){
        setPriceSortMode(false);
        setSearchResults(searchResults.slice().sort((a, b) => {
          return b.price-a.price
        }));
        
      }else{
        setPriceSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }





  return (
    <>
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
      <div className={style.flexR}>
        <input type='text' className={uiStyle.btn} onChange={onSearchChange}/>
        <Button text='Order by article' clickfunc={orderByArticle}/>
        <Button text='Order by name' clickfunc={orderByName}/>
        <Button text='Order by price' clickfunc={orderByPrice}/>
      </div>
      {token?<Button text='Create' link='/catalog/create-product'/>:''}
    </div>
   <div className={style.flexC} style={{margin:'20px',width:'40%'}}>
   {
     searchResults.map((obj,index)=>{
       return obj.article?(
         <div className={style.flexR} style={{width:'50%',justifyContent:'space-between'}}>
             <p class={style.borderedContainer}>Article:{obj.article} Name:{obj.name} Price:{obj.price}</p>
             <Button text='Details' link={`/catalog/details/${obj._id}`}/>
         </div>
       ):''
     })
     
   }
   
 </div>
    </>
  );
}

export default CatalogCategorized;