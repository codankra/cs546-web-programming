const mongoCollections = require("./collections");
const posts = mongoCollections.posts;
const animals = require("./animals");
const ObjectID = require('mongodb').ObjectID;

function isValidObjectID(input) {
  try{
      ObjectID.createFromHexString(input);
  }catch(e){
      throw input + " is not a valid/existing ObjectID";
  }
}

const exportedMethods = {
  async getAll() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },
  async get(id) {
    isValidObjectID(id);
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectID(id) });
    if (!post) throw "Post not found";
    return post;
  },
  async addPost(title, content, posterId) {
    if (typeof title !== "string") throw "No title provided";
    if (typeof content !== "string") throw "I aint got no-body!";
    //Check to see that the posterID is an actual id
    const userThatPosted = await animals.get(posterId);
    const postCollection = await posts();
    
    const newPost = {
      title: title,
      author: posterId,
      content: content
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    const newId = newInsertInformation.insertedId;
    return await this.get(String(newId));
  },
  async removeAuthor(author) {
    const postCollection = await posts();
    const pos = await postCollection.find({author: ObjectID(author)}).toArray();
    try{
      await postCollection.deleteMany({ author: ObjectID(author) });
      return pos;
    } catch(e){
      throw "error deleting posts with that author\n" + e;
    }
  },
  async updatePost(id, updatedPost) {
    isValidObjectID(id);
    const postCollection = await posts();

    const updatedPostData = {};

    if (updatedPost.newTitle) {
      updatedPostData.title = updatedPost.newTitle;
    }

    if (updatedPost.newContent) {
      updatedPostData.content = updatedPost.newContent;
    }
    let updateCommand = {
      $set: updatedPostData
    };
    const query = {
      _id: ObjectID(id)
    };
    await postCollection.updateOne(query, updateCommand);

    return await this.get(id);
  },
  async removePost(id) {
    isValidObjectID(id);
    const postByID = await this.get(id);
    const postCollection = await posts();
    const deletionInfo = await postCollection.removeOne({ _id: ObjectID(id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    return postByID;
  },
};

module.exports = exportedMethods;