import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import style from '../pages/container.module.css'
import uiStyle from '../ui/button.module.css'
import Button from '../ui/button';

class SalesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
       
        this.validator = {
          prodValid:false,
          ppcValid:false,
          amountValid:false,
          ttpValid:false
        };
        this.state.token = sessionStorage.getItem("accessToken");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onProdIdChange = this.onProdIdChange.bind(this);
        this.onPcPriceChange = this.onPcPriceChange.bind(this);
        this.onTotalPriceChange = this.onTotalPriceChange.bind(this);
    }

    onAmountChange(e){
        var val = e.target.value;
        this.setState({amount: val});
        this.validator.amountValid = val>0;
    }
    onProdIdChange(e){
      var val = e.target.value;
      this.setState({carPartId: val});
      this.validator.prodValid = val.length==24;
    }
    onPcPriceChange(e){
      var val = e.target.value;
      this.setState({pricePerPiece: val});
      this.validator.ppcValid = val>0;
    }
    onTotalPriceChange(e){
        var val = e.target.value;
        this.setState({totalPrice: val});
        this.validator.ttpValid=val>0;
      }
  

    

    handleSubmit(e){
        e.preventDefault();
        if(this.validator.amountValid && this.validator.ppcValid,this.validator.ttpValid,this.validator.prodValid){
          const url = '/api/sales';
          axios.post(url,this.state,{headers:{
            'authorization':this.state.token
        }})
          .then(()=>console.log('created product'))
          .catch((error)=>alert('permission denied'));;
          window.history.back();
        }
    }



  render(){

    return(
        <form className={style.borderedContainer} style={{width:'30%', margin:'20px'}} onSubmit={this.handleSubmit}>
            <div className={style.flexC}>
                <div>
                    <label>Product Id: </label><br />
                    <input className={uiStyle.btn} value={this.state.carPartId} style={{width:'70%',color:`${this.validator.prodValid?'white':'red'}`}}type="text" onChange={this.onProdIdChange}/><br/>
                </div>
                <div>
                    <label>Price per piece: </label><br />
                    <input className={uiStyle.btn} value={this.state.pricePerPiece} style={{width:'70%',color:`${this.validator.ppcValid?'white':'red'}`}}type="number" step='0.01' onChange={this.onPcPriceChange}/><br/>
                </div>
                <div>
                    <label>Amount: </label><br />
                    <input className={uiStyle.btn} value={this.state.amount} style={{width:'70%',color:`${this.validator.amountValid?'white':'red'}`}}type="number" onChange={this.onAmountChange}/><br/>
                </div>
                <div>
                    <label>Total Price: </label><br />
                    <input className={uiStyle.btn} value={this.state.totalPrice} style={{width:'70%',color:`${this.validator.ttpValid?'white':'red'}`}}type="number" step='0.01' onChange={this.onTotalPriceChange}/><br/>
                </div>
                
                <input className={uiStyle.btn} style={{height:'40px'}} type='submit' value='Save'/>
            </div>
        </form>
      );
  }
}

export default SalesForm;