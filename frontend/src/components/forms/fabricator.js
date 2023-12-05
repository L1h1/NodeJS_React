import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import style from '../pages/container.module.css'
import uiStyle from '../ui/button.module.css'
import Button from '../ui/button';


function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()

    const [data, setData] = useState({});
    const url = `/api/fabricators/details/${params.id}`;
    const fetchInfo = () => { 
      return axios.get(url) 
              .then((res) => setData(res.data)) 
      }
      
      useEffect(() => {
        fetchInfo();
      }, [])


    if(params.id && !data.name)
    return;

    params.baseProduct = data;
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class FabricatorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isEditMode:this.props.params.id};  

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.state.token = sessionStorage.getItem("accessToken");
        this.validator = {
          nameValid:false,
          addressValid:false,
          phoneValid:false
        };

        if(this.state.isEditMode){
          this.state.name = this.props.params.baseProduct.name;
          this.state.address = this.props.params.baseProduct.address;
          this.state.phone = this.props.params.baseProduct.phone;
          this.state.carPartId = this.props.params.baseProduct.carPartId;

          this.validator.nameValid=true;
          this.validator.addressValid=true;
          this.validator.phoneValid=true;
        }

    }

    onNameChange(e){
        var val = e.target.value;
        this.setState({name: val});
        this.validator.nameValid = val.length>0 && val.length<=64;
    }
    onAddressChange(e){
      var val = e.target.value;
      this.setState({address: val});
      this.validator.addressValid = val.length>0 && val.length<=128;
    }
    onPhoneChange(e){
      var val = e.target.value;
      this.setState({phone: val});
      const regex = /^\+375\(\d{2}\)\d{7}$/;
      this.validator.phoneValid=regex.test(val);
    }


    

    handleSubmit(e){
        e.preventDefault();
        if(this.validator.nameValid && this.validator.addressValid && this.validator.phoneValid){
          if(this.state.isEditMode){
            const url = `/api/fabricators/${this.state.isEditMode}`;
            axios.put(url,this.state,{headers:{
              'authorization':this.state.token
          }})
            .then(()=>console.log('created product'))
            .catch((error)=>alert('permission denied'));
            window.history.back();
          }else{
            const url = '/api/fabricators';
            axios.post(url,this.state,{headers:{
              'authorization':this.state.token
          }})
            .then(()=>console.log('created product'))
            .catch((error)=>alert('permission denied'));;
            window.history.back();
          }
        }
    }



  render(){

    return(
        <form className={style.borderedContainer} style={{width:'30%', margin:'20px'}} onSubmit={this.handleSubmit}>
            <div className={style.flexC}>
                <div>
                    <label>Name: </label><br />
                    <input className={uiStyle.btn} value={this.state.name} style={{width:'70%',color:`${this.validator.nameValid?'white':'red'}`}}type="text" onChange={this.onNameChange}/><br/>
                </div>
                <div>
                    <label>Address: </label><br />
                    <input className={uiStyle.btn} value={this.state.address} style={{width:'70%',color:`${this.validator.addressValid?'white':'red'}`}}type="text" onChange={this.onAddressChange}/><br/>
                </div>
                <div>
                    <label>Phone: </label><br />
                    <input className={uiStyle.btn} value={this.state.phone} style={{width:'70%',color:`${this.validator.phoneValid?'white':'red'}`}}type="text" onChange={this.onPhoneChange}/><br/>
                </div>

                
                <input className={uiStyle.btn} style={{height:'40px'}} type='submit' value='Save'/>
            </div>
        </form>
      );
  }
}

const HOCForm = withRouter(FabricatorForm);

export default HOCForm;