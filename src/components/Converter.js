import React, { useState, useEffect } from "react";
import {currencyCodesForArray, converterCurrencies, generateUrlForConverter} from '../services/CurrencyService';
import {Dropdown} from "react-dropdown-now";

const style = {
  converter:{
    width: '30%',
    margin: 'auto',
    marginTop: '20px',
    borderRadius: '20px',
    border: '2px solid lightskyblue',
  },
  form:{
    width: '50%',
    margin: 'auto',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  forDropList:{
    width: '100%',
    margin: 'auto',
    padding: '10px',
  },
  label: {
    margin: 'auto',
    paddingLeft: '14px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  input:{
    width: '50%'
  },
  btn:{
    width: '80px',
    height: '30px',
    margin: 'auto'
  },
  resultData: {
    display: 'flex',
    justifyContent: 'center',
  }  
}
export default function Converter(){
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState('');
    const [currentCurrencyUrl, setCurrentCurrencyUrl] = useState('');
    const [currentCurrencyFrom, setCurrentCurrencyFrom] = useState('UAH');
    const [currentCurrencyTo, setCurrentCurrencyTo] = useState('');

    useEffect(() => {
        if (currentCurrencyUrl !== '') {
            fetch(currentCurrencyUrl)
                .then(result => result.json())
                .then(result => {
                    setCurrentCurrency(result);
                });
                console.log(currentCurrencyUrl)
        }
    }, [currentCurrencyUrl, setCurrentCurrencyUrl])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const converterUrl = generateUrlForConverter(currentCurrencyFrom, currentCurrencyTo)
        setCurrentCurrencyUrl(converterUrl);
        const convertResult = converterCurrencies(value, currentCurrency);
        setResult(convertResult);
    }
console.log(currentCurrencyTo)
    return (
    <div className="Converter" style={style.converter}>
        <form onSubmit={handleSubmit} style={style.form}>
          <div className="form-drop-list" style={style.forDropList}>
            <Dropdown
                placeholder="Select an option"
                options={currencyCodesForArray()}
                value={currencyCodesForArray()[0]}
                onChange={(data) => {
                        setCurrentCurrencyFrom(data.value);
                    }
                }
            />
          </div>  
            <label style={style.label}>
                Value: 
                <input
                    style={style.input}
                    type="text"
                    value={value}
                    onChange={e => {
                        if (!isNaN(e.target.value)) {
                            setValue(e.target.value)
                        } else {
                            setValue(value)
                        }
                    }}
                />
            </label>
          <div className="form-drop-list" style={style.forDropList}>  
            <Dropdown
                placeholder="Select an option"
                options={currencyCodesForArray()}
                value={currencyCodesForArray()[0]}
                onChange={(data) => {
                    setCurrentCurrencyTo(data.value);
                }
                }
            />
          </div>  
            <input style={style.btn} type="submit" value="Submit" />
        </form>
        <div className="result-Data" style={style.resultData}>
          <h1> { !isNaN(result) ? result : '0'} {currentCurrencyTo} </h1>
        </div>
    </div>
);
}