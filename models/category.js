const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  subcategories: {
    type: String,
    enum: {
      values: ['Horror', 'Romance', 'Short_stories', 'Adventure_stories', 'Crime', 'Sports', 'Cookbooks', 'Health_fitness', 'History', 'Travel'],
      message: "Please enter a valid category: Horror, Romance, Short_stories, Adventure_stories, Crime, Sports, Cookbooks, Health_fitness, History, Travel."
    },
    required: [true, "Please enter a valid category: Horror, Romance, Short_stories, Adventure_stories, Crime, Sports, Cookbooks, Health_fitness, History, Travel."]
  }
});

module.exports = mongoose.model('Category', CategorySchema);
