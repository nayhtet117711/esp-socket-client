import React, {Component} from 'react';
import './App.css';

// const BASE_URL = "http://192.168.100.7:3333";
const BASE_URL = "http://localhost:3333";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bulbList: [],
    }
  }

  componentDidMount() {
    // this.intervalLoader = setInterval(this.readTempApi, 500 )    
  }

  componentWillUnmount() {
    // clearInterval(this.intervalLoader)
  }

  readTempApi = () => {
    fetch(`${BASE_URL}/socket-temp`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
		})
    .then(res => res.json())
    .then(data=>{ 
      this.setState({ bulbList: data.data }) 
    })
    .catch(error => console.log(error))
  }

  fetchApi = (pin, onOffValue) => {
    fetch(`${BASE_URL}/socket-light`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
			body: JSON.stringify({ pin, value: onOffValue })
		})
    .then(res => res.text())
    .then(data=>console.log(data))
    .catch(error => console.log(error))
  }

  render() {
    const bulbListView = this.state.bulbList.map((v, k) => {
      return (
        <button 
          key={k}
          className={`btn btn-lg ${ v.value===1 ? "btn-success" : "" }`} 
          onClick={()=>this.fetchApi(v.pin, v.value===1 ? 0 : 1) } 
          style={{ padding: 10, margin: 10 }} >Bul-{k+1}</button>
      )
    })

    return(
			<div align="center" style={{ padding: 32 }}>
        <div align="center" style={{ padding: 24, color: "#666666"}}>
          <h2> LED Light </h2>
        </div>
				
        { bulbListView }

        <div align="center" style={{ padding: 24, color: "#666666"}}>
          <h4>You can ON/OFF the LED light by clicking the above on/off buttons.</h4>
        </div>
        <hr/>
        {/* { 
          this.state.tempData!==0 
          ? <div align="center">
              <span style={{ fontSize: 22, color: "#777777"}}>Room Temperature : </span>
              <span style={{ fontSize: 30, color: "#777777", fontWeight: 900 }}>{ this.state. tempData } &#8451;</span>
            </div>
          : null
        } */}
			</div>
		)
  }
}

export default App;
