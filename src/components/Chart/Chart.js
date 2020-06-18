import React, { useEffect, useState, useContext } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Chart.css'
import { Card, CardContent, Grid } from '@material-ui/core';
import { DataContext } from '../../context'
import { fetchDailyData } from '../../api'

function Chart(country) {
    let data = useContext(DataContext)
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        };

        fetchMyAPI();
    }, []);

    //lineChart
    const lineChart = (
        dailyData[0] ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map((data) => data.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
            />
        ) : null
    );
    //DoughnutChart
    const DoughnutChart = (
        data ? (
            <Doughnut
                data={{
                    type: 'doughnut',
                    labels: ['Infected ', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0,0,255,0.5', 'rgba(0,255,0,0.5', 'rgba(255,0,0,0.5'],
                            data: [data.todayCases, data.todayRecovered, data.todayDeaths]
                        }],
                }}

                options={{
                    legend: { display: false },
                    title: { display: true, text: `Last 24 Hours Record ${data.country ? 'in ' + data.country : 'Globaly'}` }
                }}
            />
        ) : null
    );
    //barChart
    const barChart = (
        data ? (
            <Bar
                data={{
                    labels: ['Infected ', 'Recovered', 'Deaths', 'Active Cases'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0,0,255,0.5', 'rgba(0,255,0,0.5', 'rgba(255,0,0,0.5', ' #b8a55c'],
                            data: [data.cases, data.recovered, data.deaths, data.active]
                        }],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current State  ${data.country ? 'in ' + data.country : 'Globaly'}` }
                }}
            />
        ) : null
    );
    return (
        <div className="chart-container">
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={10} md={10} className="card infected daily">
                    <CardContent>
                        {lineChart}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={10} md={10} className="card infected bar">
                    <CardContent>
                        {barChart}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={10} md={10} className="card infected">
                    <CardContent>
                        {DoughnutChart}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chart;