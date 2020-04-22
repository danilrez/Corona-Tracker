import React from 'react';

/*
//default way to import
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
*/

//better way to import components: create index.js for 'components' folder)
import { Cards, CountryPicker, Chart } from './components';

import { fetchData } from './api/';
import styles from './App.module.css';

import coronaImage from './images/covid19.png';

class App extends React.Component {
  state = {
    data: {},
    coutry: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, county: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
