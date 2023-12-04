import React, {useState,useEffect} from 'react';
import axios from 'axios'
import style from './container.module.css'
import Button from '../ui/button';




function Fabricators() {
  const [data, setData] = useState([{}]);
  const url = `/api/fabricators`;



  const fetchInfo = () => { 
    return axios.get(url) 
            .then((res) => setData(res.data)) 
    }
    
    useEffect(() => {
      fetchInfo();
    }, [])

    function deleter(dataId){
      axios.delete(`/api/fabricators/${dataId}`);
    }
  
  return (
    <div className={style.flexR} style={{justifyContent:'space-between',margin:'20px', alignItems:'start'}}> 
      <div className={style.flexC} style={{margin:'0px'}}>
        {
            data.map((obj,index)=>{
              return(
                <div className={style.borderedContainer} >
                  <div className={style.flexR} style={{justifyContent:'space-between'}}>
                      <p>Name: {obj.name}</p>
                      <p>Address: {obj.address}</p>
                      <p>Phone: {obj.phone}</p>
                      <div className={style.flexC}>
                        <Button text='Edit' link={`/fabricators/edit/${obj._id}`}/>
                        <Button text='Delete' link='/fabricators/#' clickfunc={()=>deleter(obj._id)}/>
                      </div>
                  </div>
                  
                </div>
              )
            })
        }
        
      </div>
      <Button text='Create' link='/fabricators/create'/>
    </div>

  );
}

export default Fabricators;