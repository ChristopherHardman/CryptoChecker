import React, { Component } from 'react';
import './App.css';
import api from './api.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bitcoinHistorical: [],
      ethereumHistorical: []
    }
    this.bitcoinHistorical();
    this.ethereumHistorical();
  }

  bitcoinHistorical = async () => {
    const res = await api.historicalData('BTC');
    this.setState({bitcoinHistorical: res.Data})
  }

  ethereumHistorical = async () => {
    const res = await api.historicalData('ETH');
    this.setState({ethereumHistorical: res.Data})
  }

  render() {

    const bitcoinData = this.state.bitcoinHistorical.map((data,idx) => {
      let date = new Date(data.time*1000).toString().split(' ').slice(0,4).join(' ');
      return <div className="historicalDataPoint" key={idx}>
                <div>{date}</div>
                <div>{data.close}</div>
              </div>
    });

    const ethereumData = this.state.ethereumHistorical.map((data,idx) => {
      let date = new Date(data.time*1000).toString().split(' ').slice(0,4).join(' ');
      return <div className="historicalDataPoint" key={idx}>
              <div>{date}</div>
              <div>{data.close}</div>
            </div>
    });

    return (
      <div className="App">
        <div id="dataHolder">
          <h2>Crypto Currency Update</h2>
          <div className="dataHolderSection">
            <b>100 Day BTC-USD Daily Data</b>
            <hr/>
            <div id="bitcoinHistoricalDataHolder">
              {bitcoinData}
            </div>
          </div>
          <div className="dataHolderSection">
            <b>100 Day ETH-USD Daily Data</b>
            <hr/>
            <div id="bitcoinHistoricalDataHolder">
              {ethereumData}
            </div>
          </div>
          <div className="dataHolderSection">
            <b>Analysis</b>
            <hr/>
            <div className="dataAnalysis">
              <div><b>Metric</b></div>
              <div><b>Bitcoin</b></div>
              <div><b>Ethereum</b></div>
            </div>
            <div className="dataAnalysis">
              <div>Total Volume</div>
              <div>
                {this.state.bitcoinHistorical.length > 1 ? this.state.bitcoinHistorical.map(el=>el.volumeto).reduce((a,b)=>b += a).toFixed(2)
                :
                null}
              </div>
              <div>
                {this.state.ethereumHistorical.length > 1 ? this.state.ethereumHistorical.map(el=>el.volumeto).reduce((a,b)=>b += a).toFixed(2)
                :
                null}
              </div>
            </div>
            <div className="dataAnalysis">
              <div>Average Price</div>
              <div>
                {this.state.bitcoinHistorical.length > 1 ? (this.state.bitcoinHistorical.map(el=>el.close).reduce((a,b)=>b += a) / this.state.bitcoinHistorical.length).toFixed(2)
                :
                null}
              </div>
              <div>
                {this.state.ethereumHistorical.length > 1 ? (this.state.ethereumHistorical.map(el=>el.close).reduce((a,b)=>b += a) / this.state.ethereumHistorical.length).toFixed(2)
                :
                null}
              </div>
            </div>
            <div className="dataAnalysis">
              <div>Lowest Price</div>
              <div>{Math.min(...this.state.bitcoinHistorical.map(el=>el.low))}</div>
              <div>{Math.min(...this.state.ethereumHistorical.map(el=>el.low))}</div>
            </div>
            <div className="dataAnalysis">
              <div>Highest Price</div>
              <div>{Math.max(...this.state.bitcoinHistorical.map(el=>el.high))}</div>
              <div>{Math.max(...this.state.ethereumHistorical.map(el=>el.high))}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
