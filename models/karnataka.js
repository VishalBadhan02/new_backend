const { mongoose } = require("mongoose");

const KarnatakaSchema = mongoose.Schema({
    SrNo: Number,
    Type: String,
    Name_of_the_University: String,
    Address: String,
    Zip: Number,
    state: String,
    Status: String,
    Website: String,
    URL: { type: [String], default: [] },
    emails: { type: [String], default: [] },
    Filtered_url: { type: [String], default: [] }

}, { timestamps: true })

const KarnatakaModel = mongoose.model("karnatakas", KarnatakaSchema);

module.exports = { KarnatakaModel };