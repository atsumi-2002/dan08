const mongoose = require('mongoose');

const ProductoScheme = new mongoose.Schema({
    
    nombre: {
        type: String
    },
    marca: {
        type: String
    },
    stock: {
        type: String
    },
    precio: {
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model('product', ProductoScheme);
