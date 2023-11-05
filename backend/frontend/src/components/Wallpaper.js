import React, { Component } from 'react';
import homepage from '../Assets/homepageimg.jpg';
import {Link} from 'react-router-dom'

export default class Wallpaper extends Component {
  
  constructor() {
  super();
  this.state={
    location:[],
    restaurant:[],
    filteredRest:[]
  }
    //console.log("Wallpaper Constructor is called!!")
  }
 

  fetchRestaurants=(event)=>{
    console.log(event.target.value)
    fetch(`http://localhost:6767/restaurant/${event.target.value}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({restaurant:data.data}))
  }

  renderRest=(event)=>{
  
    const searchText =event.target.value;
    if(searchText){

      const filteredData = this.state.restaurant.filter(obj=>{
       return obj.name.toLowerCase().includes(searchText.toLowerCase())
      })
      this.setState({filteredRest: filteredData})
    } 
    else{
      this.setState({filteredRest:[]})
    }
  }
  static getDerivedStateFromProps(props,state){
   // console.log("Wallpaper getDerivedStateFromProps Constructor is called!!")
    return{}
  }

  shouldComponentUpdate(){
    return true
  }

  getSnapshotBeforeUpdate(prevProps,prevState){
   // console.log(`getSnapshotBeforeUpdate is called with prev props:${prevProps} and prev state:${prevState}`)
    return null;
  }

  componentDidUpdate(){
    //console.log("componentDidUpdate is called!!")
  }

  componentDidMount(){
    //console.log("Wallpaper componentDidMount is called!! ")
    //call api here
    fetch('http://localhost:6767/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({location:data.data}))
  }


  render() {
  
    let locationOptions=this.state.location.length && this.state.location.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>) 
    let restaurantsList= this.state.filteredRest.length && 
    <ul> 
      {this.state.filteredRest.map((item)=>
                                   <li key={item.name}>
                                    <Link to={`/details/${item.name}`}>
                                      {item.name}
                                    </Link>
                                    </li>)}
    </ul>
  //console.log("Wallpaper Render is called!!")
  return (
    <div>
       <div>
        <img src={homepage} width='100%' height='350'/>
        <div className="logo">
          <p>e!</p>
        </div>
        <div className="headings">Find The Best Restaurants, Cafes, Bars...</div>
        </div>
        <div className="locationSelector">
          <select className="locationDropdown" onChange={this.fetchRestaurants}>
            <option value="0">Select-Location</option>
               {locationOptions}
          </select>
        <div id="Notebooks">
          <input className="restaurantsinput" type="text" placeholder="Select Restaurant" onChange={this.renderRest}/>
               {restaurantsList}
        </div>
        
        </div>
    </div>
  )
}
}
