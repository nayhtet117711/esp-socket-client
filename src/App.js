import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempData: 0,
    }
  }

  componentDidMount() {
    this.intervalLoader = setInterval(this.readTempApi, 500 )    
  }

  componentWillUnmount() {
    clearInterval(this.intervalLoader)
  }

  readTempApi = () => {
    fetch(`http://192.168.100.46:3333/socket-temp`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
		})
    .then(res => res.json())
    .then(data=> this.setState({ tempData: data.data }) )
    .catch(error => console.log(error))
  }

  fetchApi = (onOffValue) => {
    fetch(`http://192.168.100.46:3333/socket-light`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
			body: JSON.stringify({ pin: 13, value: onOffValue })
		})
    .then(res => res.text())
    .then(data=>console.log(data))
    .catch(error => console.log(error))
  }

  render() {
    return(
			<div align="center" style={{ padding: 32 }}>
        <div align="center" style={{ padding: 24, color: "#666666"}}>
          <h2> LED Light </h2>
        </div>
				<button className="btn btn-lg btn-success" onClick={()=>this.fetchApi(1) } style={{ padding: 10, margin: 10 }} >Light On</button>
				<button className="btn btn-lg btn-secondary" onClick={()=>this.fetchApi(0) } style={{ padding: 10, margin: 10 }} >Light Off</button>
        <div align="center" style={{ padding: 24, color: "#666666"}}>
          <h4>You can ON/OFF the LED light by clicking the above on/off buttons.</h4>
        </div>
        <hr/>
        { 
          this.state.tempData!==0 
          ? <div align="center">
              <span style={{ fontSize: 22, color: "#777777"}}>Room Temperature : </span>
              <span style={{ fontSize: 30, color: "#777777", fontWeight: 900 }}>{ this.state. tempData } &#8451;</span>
            </div>
          : null
        }
			</div>
		)
  }
}

export default App;
