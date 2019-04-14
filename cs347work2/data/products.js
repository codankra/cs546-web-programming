const mongoCollections = require("../mongoCollections");
const products = mongoCollections.products;
const ObjectID = require('mongodb').ObjectID;

function isValidObjectID(input) {
    try{
        ObjectID.createFromHexString(input);
    }catch(e){
        throw input + " is not a valid ObjectID";
    }
}
function isString(input) {
    if (typeof input === 'string' || input instanceof String){
        return true;
    }
    else{
        throw "Your input " + input + " is not a string";
    }
}

module.exports = {
    async create(name, price){
        //validate input
        //make sure product can be created
        if (!name) throw "You must provide a name for your product";
        if (!price) throw "You must provide a price for your product";
        isString(name);
        isString(price);
        const productCollection = await products();
        let newProduct = {
            name: name,
            price: price
        }
        const insertInfo = await productCollection.insertOne(newProduct);
        if (insertInfo.insertedCount === 0) throw "Could not create product";

        //const newId = insertInfo.insertedId;
        return newProduct;
    },
    async getAll() {
        const productCollection = await products();
    
        const products_new = await productCollection.find({}).toArray();
    
        return products_new;
    },
    async get(id) {
        if (!id) throw "You must provide an id to search for";
        isValidObjectID(id);
    
        const productCollection = await products();
        const product = await productCollection.findOne({ _id: ObjectID(id) });
        if (product === null) throw "There is no product with that id.";
    
        return product;
      },
    async remove(id) {
        if (!id) throw "You must provide an id to search for";
        isValidObjectID(id);
        const productByID = await this.get(id);
        const productCollection = await products();
        const deletionInfo = await productCollection.removeOne(productByID);
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not remove product with id of ${id}`;
        }
        return productByID;
    },
    async rename(id, newName) {
        if (!id) 
            throw "You must provide an id to search for";
    
        if (!newName) 
            throw "You must provide a new name for your product";
        isValidObjectID(id);
        isString(newName);
    
        const productCollection = await products();
    
        const updatedInfo = await productCollection.updateOne({ _id: ObjectID(id) }, {$set : {"name": newName}});
        if (updatedInfo.modifiedCount === 0) {
            throw "could not rename product successfully or new name is same as old name.";
        }
    
        return await this.get(id);
    }
    
};