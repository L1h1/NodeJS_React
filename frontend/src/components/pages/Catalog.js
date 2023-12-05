import React, {useState,useEffect} from 'react';
import axios from 'axios'
import Button from '../ui/button';
import style from './container.module.css'
import uiStyle from '../ui/button.module.css'

function Catalog() {
  const [data, setData] = useState([{}]);
  const [searchResults, setSearchResults] = useState([{}]);
  const [sortMode,setSortMode] = useState();
  const url = 'api/categories/';
  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo().then(()=>setSearchResults(data)).then(()=>setSortMode(true));

    }, [])
  
    function onSearchChange(e){
      var val = e.target.value;
      setSearchResults(data.filter((obj)=>{
        return obj.name.toUpperCase().includes(val.toUpperCase());
      }));
    }


    function orderByName(){
      if(sortMode){
        setSortMode(false);
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
        setSortMode(true);
        setSearchResults(searchResults.slice().reverse());
      }

    }


  return (
    <>

    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
    
      <div className={style.flexR}>
        <input type='text' className={uiStyle.btn} onChange={onSearchChange}/>
        <Button text='Order by name' clickfunc={orderByName}/>
      </div>
    <Button text='Create' link='/catalog/create'/>
    </div>
    <div className={style.flexC} style={{margin:'20px'}}>
      {
        searchResults.map((obj,index)=>{
          return(
            <Button text={obj.name} link={`/catalog/categorized/${obj._id}`}/>
          )
        })
      }
    </div>
    </>
    
  );
}

export default Catalog;