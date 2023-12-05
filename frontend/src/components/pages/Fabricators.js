import React, {useState,useEffect} from 'react';
import axios from 'axios'
import style from './container.module.css'
import Button from '../ui/button';
import uiStyle from '../ui/button.module.css'



function Fabricators() {
  const [data, setData] = useState([{}]);
  const [searchResults, setSearchResults] = useState([{}]);
  const [nameSortMode,setNameSortMode] = useState();
  const url = `/api/fabricators`;
  const token = sessionStorage.getItem("accessToken");


  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo().then(()=>setNameSortMode(true)).then(()=>setSearchResults(data));
    }, [])

    function deleter(dataId){
      axios.delete(`/api/fabricators/${dataId}`);
    }
    
    function onSearchChange(e){
      var val = e.target.value;

      setSearchResults(data.filter((obj)=>{
        return obj.name.toUpperCase().includes(val.toUpperCase()) 
        || obj.address.toUpperCase().includes(val.toUpperCase())
        || obj.phone.includes(val);
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

  return (
    <>
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
      <div className={style.flexR}>
        <input type='text' className={uiStyle.btn} onChange={onSearchChange}/>
        <Button text='Order by name' clickfunc={orderByName}/>
      </div>
      {token?      <Button text='Create' link='/fabricators/create'/>:''}

    </div>
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
      <div className={style.flexC} style={{margin:'0px'}}>
        {
            searchResults.map((obj,index)=>{
              return(
                <div className={style.borderedContainer} >
                  <div className={style.flexR} style={{justifyContent:'space-between'}}>
                      <p>Name: {obj.name}</p>
                      <p>Address: {obj.address}</p>
                      <p>Phone: {obj.phone}</p>
                      <div className={style.flexC}>
                        {token?(<><Button text='Edit' link={`/fabricators/edit/${obj._id}`}/><Button text='Delete' link='/fabricators/#' clickfunc={()=>deleter(obj._id)}/></>):''}
                        
                      </div>
                  </div>
                  
                </div>
              )
            })
        }
        
      </div>
    </div>
    </>
    

  );
}

export default Fabricators;