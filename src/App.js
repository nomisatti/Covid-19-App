import React, { useEffect, useState } from 'react';
import { DailyCards, Cards, Chart, CountryPicker, Header, TableData } from './components';
import './App.css';
import { DataContext } from './context'
import { fetchData } from './api'


function App() {
  const [data, setData] = useState();
  const [country, setCountry] = useState()
  const [countryFlag, setCountryFlag] = useState(false)
  useEffect(() => {
    const fetchedData = async () => {
      setData(await fetchData());
    };
    fetchedData();
  }, [])

  const handleChangeCountry = async (countryData) => {
    setCountryFlag(true)
    setData(await fetchData(countryData))
    console.log('InSide', countryData)
    setCountry(countryData)
    setCountryFlag(false)
  }
  return (
    data ?
      <div className="App">
        <DataContext.Provider value={data}>
          <Header />
          <div className="container">
            <div className="col-md-12 xs-12">
              <div className="form-inline CountrySection">
                {countryFlag ? <img className="loader" src={require('./images/Coronavirus.gif')} alt="loader"></img> :
                  <img className="countryFlag" src={country ? data.countryInfo.flag : require('./images/Global.jpg')} alt="img" />}
                <CountryPicker className="CountryPicker" handleChangeCountry={handleChangeCountry} />
                <a type="button" className="btn btn-danger" href="#mtTable">View All Record</a>
              </div>
            </div>
          </div>
          <Cards />
          <div className="TopSection">
            < DailyCards className="dailyCards" />
            <Chart country={country} />
          </div>
          <div id="mtTable">
            <div className="container-fluid">
              <TableData />
            </div>
          </div>
        </DataContext.Provider>
      </div>
      : 'Loading ....'
  )
}

export default App;
