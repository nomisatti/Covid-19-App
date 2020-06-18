import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl} from '@material-ui/core'
import { fetchCountries } from '../../api'
import './CountryPicker.css'

function CountryPicker({ handleChangeCountry }) {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchedCountries = async () => {
      setCountries(await fetchCountries());
    }
    fetchedCountries()
  }, [])

  return (
    <div>
      <FormControl className="CountryPicker">
        <Autocomplete
          id="combo-box-demo"
          onChange={(event, value) => handleChangeCountry(value)}
          options={countries}
          getOptionLabel={(countries) => countries}
          style={{ width: 300 }}
          renderInput={(countries) => <TextField {...countries} label="Select Country" variant="outlined" />}
        />
      </FormControl>
    </div>
  );
}
export default CountryPicker
