import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connection = async () => {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log("Mongodb Connected");
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Makes this field required
        minlength: 3,    // Minimum length for the name
        maxlength: 100   // Maximum length for the name
    },
    phoneNumber: {
        type: String,
    },
    service: {
        type: String
    },
    serviceDate: {
        type: String,
        default: Date.now  // Sets the default value as the current date
    },
    serviceTime: {
        type: String,
        default: Date.now
    }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);
const multer = upload();
app.use('/add/service', async (req, res) => {
    const { name, phone, selectedServices, date, time } = req.body;
    console.log(req.body);
    try {
        // Add the new service to the database
        const user = new User({ 
            name,
            phoneNumber: phone,
            service: selectedServices,
            serviceDate: date,
            serviceTime: time
        });
        await user.save();
        res.status(201).json({ message: 'Service added successfully', data: add });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

connection();
app.listen(3000, () => {
    console.log("Running on 3000")
})