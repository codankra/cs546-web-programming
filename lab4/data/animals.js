const mongoCollections = require("../mongoCollections");
const animals = mongoCollections.animals;
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
    async create(name, animalType){
        //validate input
        //make sure animal can be created
        if (!name) throw "You must provide a name for your animal";
        if (!animalType) throw "You must provide a type for your animal";
        isString(name);
        isString(animalType);
        const animalCollection = await animals();
        let newAnimal = {
            name: name,
            animalType: animalType
        }
        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertedCount === 0) throw "Could not create animal";

        //const newId = insertInfo.insertedId;
        return newAnimal;
    },
    async getAll() {
        const animalCollection = await animals();
    
        const animals_new = await animalCollection.find({}).toArray();
    
        return animals_new;
    },
    async get(id) {
        if (!id) throw "You must provide an id to search for";
        isValidObjectID(id);
    
        const animalCollection = await animals();
        const animal = await animalCollection.findOne({ _id: ObjectID(id) });
        if (animal === null) throw "There is no animal with that id.";
    
        return animal;
      },
    async remove(id) {
        if (!id) throw "You must provide an id to search for";
        isValidObjectID(id);
        const animalByID = await this.get(id);
        const animalCollection = await animals();
        const deletionInfo = await animalCollection.removeOne(animalByID);
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not remove animal with id of ${id}`;
        }
        return animalByID;
    },
    async rename(id, newName) {
        if (!id) 
            throw "You must provide an id to search for";
    
        if (!newName) 
            throw "You must provide a new name for your animal";
        isValidObjectID(id);
        isString(newName);
    
        const animalCollection = await animals();
    
        const updatedInfo = await animalCollection.updateOne({ _id: ObjectID(id) }, {$set : {"name": newName}});
        if (updatedInfo.modifiedCount === 0) {
            throw "could not rename animal successfully or new name is same as old name.";
        }
    
        return await this.get(id);
    }
    
};