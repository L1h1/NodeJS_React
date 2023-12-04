import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import style from '../pages/container.module.css'
import uiStyle from '../ui/button.module.css'
import Button from '../ui/button';
class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.validator={};  

        this.state.name='nothing here';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e){
        var val = e.target.value;
        this.setState({name: val});
        this.validator.nameValid=val.length<=24 && val.length>0;
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.nameValid){
            const url = '/api/categories';
            axios.post(url,{name:this.state.name})
            .then(()=>console.log('created category'));
            window.history.back();
        }
    }



  render(){
    return (
        <form className={style.borderedContainer} style={{width:'30%', margin:'20px'}} onSubmit={this.handleSubmit}>
            <div className={style.flexC}>
                <div>
                    <label>Name: </label><br />
                    <input className={uiStyle.btn} style={{width:'70%', color:`${this.validator.nameValid?'white':'red'}`}}type="text" onChange={this.onNameChange} /><br/>
                </div>
                <input className={uiStyle.btn} style={{height:'40px'}} type='submit' value='Save'/>
            </div>
        </form>
      );
  }
}

export default CategoryForm;