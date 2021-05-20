const express = require('express');
require('./db/mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const faqRoutes = require('./routes/faqRoutes');
const cors = require('cors');


app.use(cors())
app.use(express.json());
app.use(userRoutes);
app.use(faqRoutes);

const port = process.env.PORT || 8000;

app.get('/',(req,res) => {
    res.send({message: 'hello'})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})