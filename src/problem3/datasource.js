// your code here:
class Datasource {
    constructor(endpointURL) {
        this.endpointURL = endpointURL;
    }

    async getPrices() {
        const response = await fetch(this.endpointURL);
        const data = await response.json();
        const prices = data.data.prices;

        let result = [];
        for (const price of prices) {
            result.push(
                new Price(
                    price.id,
                    // based on the expected output, the buy and sell in the data endpoint
                    // are multiplied by 100
                    price.buy / 100,
                    price.sell / 100,
                    price.pair,
                    price.timestamp
                )
            );
        }

        return result;
    }
}

class Price {
    constructor(id, buy, sell, pair, timestamp) {
        this.id = id;
        this.buy = buy;
        this.sell = sell;
        this.pair = pair;
        this.timestamp = timestamp;
    }

    mid() {
        // round to 3 decimal places (based on expected output)
        const num = ((this.buy + this.sell) / 2) * 1000;
        return Math.round(num) / 1000;
    }

    quote() {
        return this.pair.slice(-3);
    }
}
