import axios from "axios";

export default {
    getRates(params) {
        const appId = "f53561faf19f41e5a8a2b9c5ddfe7700";
        const url = "https://openexchangerates.org/api/latest.json";

        const needed = Array.from(new Set([...params.symbols, params.base]));

        return axios.get(url, {
            params: {
                app_id: appId,
                symbols: needed.join(","),
            },
        }).then(res => {
            const data = res.data;

            const apiBase = data.base;
            const ratesFromApiBase = data.rates;
            const rateApiBaseToDesired = ratesFromApiBase[params.base];

            const converted = {};
            params.symbols.forEach(c => {
                if (c === apiBase) {
                    converted[c] = +(1 / rateApiBaseToDesired).toFixed(3);
                } else {
                    converted[c] = +(ratesFromApiBase[c] / rateApiBaseToDesired).toFixed(3);
                }
            });

            return {
                base: params.base,
                rates: converted,
                balance: 150000,
                lastUpdated: new Date(data.timestamp * 1000),
            };
        });
    },
};
