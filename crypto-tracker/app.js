/* eslint-disable no-undef */
// Using API from https://coinmarketcap.com/api/documentation/v1/
// curl -H "X-CMC_PRO_API_KEY: f1fdbebf-0d33-4134-8a1d-7963b02958ad" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox.coinmarketcap.com/v1/cryptocurrency/listings/latest
// https://sandbox.coinmarketcap.com/v1/cryptocurrency/info
const SANDBOX_URL = 'https://sandbox.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const PRO_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const DEV_KEY = 'f1fdbebf-0d33-4134-8a1d-7963b02958ad';
const IS_DEV = window.location.hostname === '0.0.0.0';

const fetchCoinData = () => {
    const request = new Request(PRO_URL, {
        method: 'GET',
        // mode: 'no-cors',
        body: null,
        headers: new Headers({
            'X-CMC_PRO_API_KEY': DEV_KEY
        })
    });
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(request);
            const data = await response.json();
            const cryptoData = data.data || [];
            resolve(cryptoData);
        } catch (error) {
            console.warn(`Error: `, error);
            reject(error);
        }
    });
    /* return new Promise((resolve, reject) => {
        fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(`Data: `, data);
                // const cryptoData = data.data || [];
                const cryptoData = data.results || [];
                resolve(cryptoData);
            })
            .catch(error => {
                console.warn(`Error: ${error}`);
                reject(error);
            });
    }); */
};

const createNode = element => {
    return document.createElement(element);
};

const append = (parent, element) => {
    return parent.appendChild(element);
};

const renderDom = (cryptoData = []) => {
    const listContainer = document.querySelector('.listContainer');
    const list = '';
    cryptoData.map(coin => {
        const div = createNode('div');
        const price = (coin.quote.USD.price || 0).toFixed(2);
        const twoDays = (Math.abs(coin.quote.USD.percent_change_24h) || 0).toFixed(2);
        const twoDaysTrend = coin.quote.USD.percent_change_24h > 0 ? 'positive' : 'negative';
        const sevenDays = (Math.abs(coin.quote.USD.percent_change_7d) || 0).toFixed(2);
        const sevenDaysTrend = coin.quote.USD.percent_change_7d > 0 ? 'positive' : 'negative';
        div.className = 'card';
        div.innerHTML = `<div class="cardMain">
        <div class="coinLogo">
        <img
        src=${images[coin.symbol] || 'https://www.burns-360.com/wp-content/uploads/2018/09/Sample-Icon.png'}
            alt="coinLogo"
            height="50"
            width="50"
            />
            </div>
            <div class="cardInfo">
            <span class="coinName"><span class="coinSymbol">${coin.symbol || ''}</span>|<span>${coin.name ||
            ''}</span></span>
                <span class="coinPrice">${price} $</span>
                </div>
                </div>
                <div class="cardData">
                <span class="dayData">24h: <span class=${twoDaysTrend || 'neutral'}>${twoDays} %</span></span>
                <span class="weekData">7d: <span class=${sevenDaysTrend || 'neutral'}>${sevenDays} %</span></span>
                    </div>`;
        append(listContainer, div);
    });
};

(init = () => {
    if (!IS_DEV) {
        fetchCoinData().then(cryptoData => {
            renderDom(cryptoData);
        });
    } else {
        renderDom(response.data);
    }
})();
