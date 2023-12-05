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
    const url = `/api/goods/details/${params.productId}`;
    const fetchInfo = () => { 
      return axios.get(url) 
              .then((res) => setData(res.data)) 
      }
      
      useEffect(() => {
        fetchInfo();
      }, [])


    if(params.productId && !data.name)
    return;

    params.baseProduct = data;
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditMode:this.props.params.productId,
        }; 
        
        this.validator = {
          nameValid:false,
          articleValid:false,
          priceValid:false,
          categoryValid:false,
          fabricatorValid:false
        };
        this.state.token = sessionStorage.getItem("accessToken");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onArticleChange = this.onArticleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onFabricatorChange = this.onFabricatorChange.bind(this);


        if(this.state.isEditMode){
          this.state.name = this.props.params.baseProduct.name;
          this.state.article = this.props.params.baseProduct.article;
          this.state.price = this.props.params.baseProduct.price;
          this.state.categoryId = this.props.params.baseProduct.categoryId;
          this.state.fabricatorId = this.props.params.baseProduct.fabricatorId;

          this.validator.nameValid=true;
          this.validator.articleValid=true;
          this.validator.priceValid=true;
          this.validator.categoryValid=true;
          this.validator.fabricatorValid=true;
        }

    }

    onNameChange(e){
        var val = e.target.value;
        this.setState({name: val});
        this.validator.nameValid=val.length<=64 && val.length>0;
    }
    onArticleChange(e){
      var val = e.target.value;
      this.setState({article: val});
      this.validator.articleValid=val.length<=32 && val.length>0;
    }
    onPriceChange(e){
      var val = e.target.value;
      this.setState({price: val});
      this.validator.priceValid=val>0;
    }
    onCategoryChange(e){
      var val = e.target.value;
      this.setState({categoryId: val});
      this.validator.categoryValid=val.length==24;
    }
    onFabricatorChange(e){
      var val = e.target.value;
      this.setState({fabricatorId: val});
      this.validator.fabricatorValid=val.length==24;
    }
    

    handleSubmit(e){
        e.preventDefault();
        if(this.validator.nameValid && this.validator.articleValid
          && this.validator.priceValid && this.validator.categoryValid && this.validator.fabricatorValid){
          if(this.state.isEditMode){
            const url = `/api/goods/${this.state.isEditMode}`;
            axios.put(url,this.state,{headers:{
              'authorization':this.state.token
          }})
            .then(()=>console.log('created product'))
            .catch((error)=>alert('permission denied'));;
            window.history.back();
          }else{
            const url = '/api/goods';
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
                    <label>Article: </label><br />
                    <input className={uiStyle.btn} value={this.state.article} style={{width:'70%',color:`${this.validator.articleValid?'white':'red'}`}}type="text" onChange={this.onArticleChange}/><br/>
                </div>
                <div>
                    <label>Price: </label><br />
                    <input className={uiStyle.btn} value={this.state.price} style={{width:'70%',color:`${this.validator.priceValid?'white':'red'}`}}type="number" step='0.01' onChange={this.onPriceChange}/><br/>
                </div>
                <div>
                    <label>CategoryId: </label><br />
                    <input className={uiStyle.btn} value={this.state.categoryId} style={{width:'70%',color:`${this.validator.categoryValid?'white':'red'}`}}type="text" onChange={this.onCategoryChange}/><br/>
                </div>
                <div>
                    <label>FabricatorId: </label><br />
                    <input className={uiStyle.btn} value={this.state.fabricatorId} style={{width:'70%',color:`${this.validator.fabricatorValid?'white':'red'}`}}type="text" onChange={this.onFabricatorChange}/><br/>
                </div>
                <input className={uiStyle.btn} style={{height:'40px'}} type='submit' value='Save'/>
            </div>
        </form>
      );
  }
}

const HOCProductForm = withRouter(ProductForm);

export default HOCProductForm;