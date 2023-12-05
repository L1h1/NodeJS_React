import React, {useState,useEffect} from 'react';

import axios from 'axios'
import style from '../pages/container.module.css'
import uiStyle from '../ui/button.module.css'
import Button from '../ui/button';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.validator={};  


        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);

    }

    onNameChange(e){
        var val = e.target.value;
        this.setState({username: val});
        this.validator.usernameValid = val.length>0;
    }
    onPwdChange(e){
      var val = e.target.value;
      this.setState({password: val});
      this.validator.pwdValid = val.length>0;
    }

  

    

    handleSubmit(e){
        e.preventDefault();
        if(this.validator.usernameValid && this.validator.pwdValid){
          const url = '/api/login';
          axios.post(url,{username:this.state.username,password:this.state.password})
          .then((res)=>{
            sessionStorage.setItem('accessToken',res.data.accessToken);
            alert('Login Successful')
            window.history.back();
          }).catch((error)=>alert('Invalid credentials'));
          
        }
    }



  render(){

    return(
        <form className={style.borderedContainer} style={{width:'30%', margin:'20px'}} onSubmit={this.handleSubmit}>
            <div className={style.flexC}>
                <div>
                    <label>Username: </label><br />
                    <input className={uiStyle.btn} value={this.state.username} style={{width:'70%',color:`${this.validator.usernameValid?'white':'red'}`}}type="text" onChange={this.onNameChange}/><br/>
                </div>
                <div>
                    <label>Password: </label><br />
                    <input className={uiStyle.btn} value={this.state.password} style={{width:'70%',color:`${this.validator.pwdValid?'white':'red'}`}}type="text" onChange={this.onPwdChange}/><br/>
                </div>
                
                
                <input className={uiStyle.btn} style={{height:'40px'}} type='submit' value='Save'/>
            </div>
        </form>
      );
  }
}

export default LoginForm;