import {setDefaultCurrencies, currencyCodesForArray} from '../services/CurrencyService';
import React, { useState, useEffect} from "react";
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';

const style = {
    dropList: {
        width: '50%',
        margin: 'auto',
        marginTop: '10px',
    },
    form:{
        width: '70%',
        margin: 'auto',
        marginTop: '20px',
        borderRadius: '20px',
        border: '2px solid lightskyblue',
       
    },
    li:{
        display: 'flex',
        justifyContent: 'space-around',
    },
    pCours: {
        paddingRight: '32px',
    },
    pData:{
        paddingRight: '47px'
    }
} 

function Exchange() {
    const [defaultCurrenciesState, setDefaultCurrenciesState] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if(defaultCurrenciesState === '') {
            setDefaultCurrenciesState(setDefaultCurrencies('UAH')) 
        }

        fetch(defaultCurrenciesState)
            .then(result => result.json())
            .then(result => {
                setData(result);
            });
    }, [setData, defaultCurrenciesState])

    const result = (data.status === true) 
        ? data.currency.map((elem) => 
            <li style={style.li}>
                <p>{elem.currency}</p>
                <p>{elem.value}</p>
                <p>{elem.date}</p>
            </li>)
        : '';

    return (
    <div className="Exchange">
        <div className='drop-list' style={style.dropList}>
          <Dropdown
              placeholder="Select an option"
              options={currencyCodesForArray()}
              value={currencyCodesForArray()[0]}
                  onChange={(data) => {
                      const defCurr = setDefaultCurrencies(data.value);
                      setDefaultCurrenciesState(defCurr);
                  }
              }
          />
        </div>
       <div className='form' style={style.form}>
        <li style={style.li}>
            <p>Name</p>
            <p style={style.pCours}>Сourse</p>
            <p style={style.pData}>Data</p>
        </li>
        {result}
       </div>
    </div> 
  );
}

export default Exchange;