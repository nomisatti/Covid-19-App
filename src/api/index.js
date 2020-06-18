import axios from 'axios'


export const fetchData = async (country) => {

    let apiurl;
    if (!country) {
        apiurl = 'https://disease.sh/v2/all';
    }
    else {
        apiurl = 'https://disease.sh/v2/countries/' + country;
    }

    try {
        if (!country) {
            const { data: { cases, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion } } = await axios.get(apiurl);
            return { cases, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion };

        }
        else {
            const { data: { cases, country, countryInfo: { flag }, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion } } = await axios.get(apiurl);
            console.log({ cases, country, countryInfo: { flag }, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion })
            return { cases, country, countryInfo: { flag }, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion };
        }

    }
    catch (error) {
        console.log(error)
    }
}


export const fetchCuntryData = async (country) => {
    console.log('In Fetech Countries');
    let apiurl = 'https://disease.sh/v2/countries/usa';

    console.log('Url: ', apiurl)
    try {
        const { data: { cases, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion } } = await axios.get(apiurl);
        return { cases, recovered, deaths, updated, todayCases, todayDeaths, active, todayRecovered, critical, population, tests, casesPerOneMillion, recoveredPerOneMillion };

    }
    catch (error) {
        console.log(error)
    }
}

export const fetchtableData = async () => {
    let url = "https://disease.sh/v2/countries";
    try {

        const { data } = await axios.get(url);//`${url}/daily`);
        const resultData = data.map((dailyData) => ({
            id: dailyData.countryInfo._id ? dailyData.countryInfo._id : Math.floor(Math.random() * 1000000),
            active: dailyData.active,
            deaths: dailyData.deaths,
            country: dailyData.country,
            recovered: dailyData.recovered,
            todayCases: dailyData.todayCases,
            todayDeaths: dailyData.todayDeaths,
            todayRecovered: dailyData.todayRecovered,
            cases: dailyData.cases,
            critical: dailyData.critical,
            casesPerOneMillion: dailyData.casesPerOneMillion,
            deathsPerOneMillion: dailyData.deathsPerOneMillion,
            activePerOneMillion: dailyData.activePerOneMillion,
            recoveredPerOneMillion: dailyData.recoveredPerOneMillion,
            criticalPerOneMillion: dailyData.criticalPerOneMillion,
            tests: dailyData.tests,
            population: dailyData.population,
            updated: dailyData.updated

        }))

        //const  {data } = await axios.get(url);

        //return {data};

        return resultData

    }
    catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {

    try {

        const { data: countries } = await axios.get('https://disease.sh/v2/countries');
        // console.log('In Fetch Contures',countries.map((country) => country.country))
        return countries.map((country) => country.country);
    } catch (error) {
        return error;
    }
}



export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get('https://covid19.mathdro.id/api/daily');

        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
        return error;
    }
};