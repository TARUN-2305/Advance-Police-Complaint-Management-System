const mongoose = require('mongoose');

const InternalNoteSchema = new mongoose.Schema({
    complaint_id: { type: Number, required: true, index: true },
    officer_id: { type: Number, required: true },
    officer_name: { type: String, required: true }, // Store snapshot of name
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InternalNote', InternalNoteSchema);
