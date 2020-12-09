const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const s3 = new aws.S3()

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PostSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

PostSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 'S3') {
    return s3.deleteObject({
      Bucket: 'uploadexamples3',
      Key: this.key
    }).promise()
  } else {
    return fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key), (err => {
      if (err) console.log(err)
      else {
        console.log("\nDeleted file");
      }
    }))
  }
})


module.exports = mongoose.model("Post", PostSchema)