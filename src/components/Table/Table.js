import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import { fetchtableData } from '../../api'
import './Table.css'
const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    .bg-critical {
        background: #B8A55C;
      }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  

  }
`

function Table({ columns, data,initialState }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState
        },
        useSortBy
    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice()

    return (
        <div className="table-responsive"> 
                    
            <table className="table table-bordered" {...getTableProps()}>
                <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => { 
                                        return (
                                            <td {...cell.getCellProps( 
                                             
                                                {className: cell.column.className }
                                            )}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
        </div>
    )
}

const initialState = {
    sortBy: [
      {
        id: "cases",
        desc: false // Explicitly set desc to false
      }
    ]
  };

function TableData() {


    const [dailyData, setDailyData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setDailyData(await fetchtableData());
        }

        fetchData()

    }, [])
    
    const columns = React.useMemo(
   
        () => 
        [
           
            {
                Header: 'Countries',

                columns: [
                    {
                        Header: 'Country',
                        accessor: 'country',
                    },
                    {
                        Header: 'Population',
                        accessor: 'population',
                    },
                    {
                        Header: 'Tests',
                        accessor: 'tests',
                    },
                    
                ],
            },

            {
                Header: 'Total Record',
                columns: [
                    {
                        Header: 'Cases',
                        accessor: 'cases',
                        className:"bg-primary",
                        sortInverted: true
                    },
                    {
                        Header: 'Active Cases',
                        accessor: 'active',
                        className:"bg-warning"
                    },
                    {
                        Header: 'Recovered',
                        accessor: 'recovered',
                        className:"bg-success"
                    },
                    {
                        Header: 'Critical',
                        accessor: 'critical',
                        className:"bg-critical"
                    },
                    {
                        Header: 'Deaths',
                        accessor: 'deaths',
                        className: "bg-danger"
                    },
                ],
            },
            {
                Header: 'Last 24 hours Record',
                columns: [
                    {
                        Header: 'Cases',
                        accessor: 'todayCases',
                        className:"bg-primary"
                    },
                    {
                        Header: 'Recovered',
                        accessor: 'todayRecovered',
                        className:"bg-success"

                    },
                    {
                        Header: 'Deaths',
                        accessor: 'todayDeaths',
                        className: "bg-danger"
                    },
                    
                ],
            },
            {
                Header: 'Record / 1 M Population',
                columns: [
                    {
                        Header: 'Cases',
                        accessor: 'casesPerOneMillion',
                        className:"bg-primary"
                    },
                    {
                        Header: 'Active Cases',
                        accessor: 'activePerOneMillion',
                    },
                    {
                        Header: 'Recovered',
                        accessor: 'recoveredPerOneMillion',
                        className:"bg-success"
                    },
                    {
                        Header: 'Critical',
                        accessor: 'criticalPerOneMillion',
                    },
                    {
                        Header: 'Deaths',
                        accessor: 'deathsPerOneMillion',
                        className: "bg-danger"
                    }
                    
                ],
            },
        ], 

        []
    )

    return (
      
        <Styles>
           { dailyData ? <Table columns={columns} data={dailyData} initialState={initialState} />  : <img className="loader" src={require('../../images/Coronavirus.gif')} alt="loader"></img>}

        </Styles>
        
    )
}

export default TableData