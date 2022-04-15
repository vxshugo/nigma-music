const mongoose = require("mongoose");
const Joi = require("joi");

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    verify: { type: Boolean, default: false },
    songs: { type: Array, default: [] },
    albums: { type: Array, default: [] },
    img: { type: String },
});

const validate = (artist) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        verify: Joi.bool().required(),
        songs: Joi.array().items(Joi.string()),
        albums: Joi.array().items(Joi.string()),
        img: Joi.string().allow(""),
    });
    return schema.validate(artist);
};

const Artist = mongoose.model("artist", ArtistSchema);

module.exports = { Artist, validate };