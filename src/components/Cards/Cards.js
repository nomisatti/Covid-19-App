import React, { useContext } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import { DataContext } from '../../context'
import './Cards.css'

function MainCards() {

    const data = useContext(DataContext)
    return (
        <div >
            <div className='mainContainer'>
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={10} md={2} className="card infected">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> INFECTED</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.cases} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Active Cases</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={10} md={2} className="card recoveries">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> RECOVERIES</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.recovered} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Recoveries</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={10} md={2} className="card deaths">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> DEATHS</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.deaths} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Deaths</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={10} md={2} className="card active">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom> ACTIVE CASES</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={data.active} duration={2.5} separator="," />
                            </Typography>
                            <Typography color='textSecondary'>{new Date(data.updated).toDateString()}</Typography>
                            <Typography variant="body2">Number of Active Cases</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MainCards;