import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  featuredImage: {
    type: String,
    default: "/uploads/blogs/default.jpg"
  },
  author: {
    type: String,
    default: "Coffee Barista Team"
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Coffee Tips', 'Brewing Guide', 'Health Benefits', 'Coffee Stories', 'News'],
    default: 'Coffee Tips'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true
});

// Generate slug before saving
blogSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
});

export default mongoose.model("Blog", blogSchema);
