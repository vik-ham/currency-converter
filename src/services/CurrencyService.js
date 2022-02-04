const url = 'https://currencydatafeed.com/api/data.php';
const accessToken = 'rhpg7rg67mycmyyof1lh';
export const curCodes = {
    'UAH': 'Ukranian Hryvnia',
    'USD': 'US Dollar', 
    'EUR': 'Euro',
    'JPY': 'Japanese Yen',
    'NOK': 'Norwegian Krone'
};

export function setDefaultCurrencies(defaultCurrencies) {
    let generatedUrl = `${url}?currency=`;
    let currencyCodesRow = '';
    for (const [code] of Object.entries(curCodes)) {
        if (code !== defaultCurrencies) {
            currencyCodesRow = `${currencyCodesRow}+${defaultCurrencies}/${code}+`;
        }
    }

    return `${generatedUrl}${currencyCodesRow.slice(0, -1)}&token=${accessToken}`;
}

export function converterCurrencies(value, converterData) {
    if (converterData.status != true) {
        return;
    }

    return value * converterData.currency[0].value;
}

export function generateUrlForConverter(from, to) {
    return`${url}?currency=${from}/${to}&token=${accessToken}`;
}

export function currencyCodesForArray() {
    let currencies = [];
    for (const [code] of Object.entries(curCodes)) {
        currencies.push(code);
    }

    return currencies;
}