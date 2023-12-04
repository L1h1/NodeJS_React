import React, {useState,useEffect} from 'react';
import axios from 'axios'
import Button from '../ui/button';
import style from './container.module.css'

function Catalog() {
  const [data, setData] = useState([{}]);
  const url = 'api/categories/';
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
            <Button text={obj.name} link={`/catalog/categorized/${obj._id}`}/>

          )
        })
      }
    </div>
      <Button text='Create' link='/catalog/create'/>
    </div>
    
  );
}

export default Catalog;