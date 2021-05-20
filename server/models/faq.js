const mongoose = require('mongoose');
const { Schema } = mongoose;

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer:{
        type: String,
        required:true,
        trim: true
    },
    categeories:[{
        cat_id: {
            type: Schema.Types.ObjectId,
            ref:'Faq'
        },
        cat_name: {
            type: String,
            required: true
        }
    }]
})


const Faq = mongoose.model('Faq', faqSchema);
module.exports = Faq;