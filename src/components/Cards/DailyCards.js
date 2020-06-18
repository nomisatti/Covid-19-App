import React, { useContext } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import { DataContext } from '../../context'
import './Cards.css'

function DailyCards() {
    const data = useContext(DataContext)
    return (
        <div >
            <div className='mainDailyContainer'>
                <Typography variant="h3" component="h2"> Last 24 Hours</Typography>
                <br />
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={10} md={6} className="cardDaily cases">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> Cases</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.todayCases} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Active Cases</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={10} md={6} className="cardDaily recovered">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> Recovered</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.todayRecovered} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Active Cases</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={10} md={6} className="cardDaily death">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.todayDeaths} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Active Cases</Typography>
                        </CardContent>
                    </Grid>

                </Grid>
            </div>
        </div>);
}

export default DailyCards;