const express = require('express')
const app = express();
const PORT = 5000;
const axios = require('axios');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiUrl = 'https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=0x0Ad3a144685F1E43371072418A9478cB5d926bd3&apikey=TEAZA5PYPXI12YC3QEE8GC3J9NFUQFGZWY';

app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

app.get('/getTotalSupply', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const result = response.data;

        if (result.status === '1' && result.message === 'OK') {
            const totalSupply = result.result;
            const totalSupplyInEther = totalSupply / Math.pow(10, 18);
            return res.send(totalSupplyInEther.toString());
        } else {
            console.error('Error fetching total supply:', result.message);
            res.status(500).json({ error: 'Error fetching total supply' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching total supply' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})