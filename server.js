const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid data format' });
        }

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let numbers_sum = 0;
        let concat_string = '';

        data.forEach(item => {
            if (/^\d+$/.test(item)) { 
                let num = parseInt(item);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                numbers_sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) { 
                alphabets.push(item.toUpperCase());
                concat_string += item;
            } else { 
                special_characters.push(item);
            }
        });

        
        let reversedConcat = concat_string.split('').reverse();
        let finalConcat = '';
        reversedConcat.forEach((ch, idx) => {
            finalConcat += idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
        });

        const response = {
            is_success: true,
            user_id: "saksham_sabharwal_18072003", 
            email: "saksham2226.be22@chitkara.edu.in",      
            roll_number: "2210992226",          
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: numbers_sum.toString(),
            concat_string: finalConcat
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send("BFHL API is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


