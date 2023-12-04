import React, {useState,useEffect} from 'react';
import Clock from '../ui/clock';
import axios from 'axios'
function Home() {
  const [apiOne,setApiOne] = useState({});
  const [apiTwo,setApiTwo] = useState({});
  const urlOne = 'https://catfact.ninja/fact';
  const urlTwo = 'https://www.boredapi.com/api/activity';

  const fetchInfo1 = () => { 
    return axios.get(urlOne) 
            .then((res) => setApiOne(res.data)) 
    };
    const fetchInfo2 = () => { 
      return axios.get(urlTwo) 
              .then((res) => setApiTwo(res.data)) 
      };
      useEffect(() => {
        fetchInfo1();
      }, []);
      useEffect(() => {
        fetchInfo2();
      }, []);

  return (
    <div style={{margin:'20px'}}>
    <Clock/>
      <p>{apiOne.fact}</p>
      <p>{apiTwo.activity}</p>
    </div>

  );
}

export default Home;