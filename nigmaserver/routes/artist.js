const router = require("express").Router();
const { Artist, validate } = require("../models/artist");
const { Song } = require("../models/song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");
const {User} = require("../models/user");
const {PlayList} = require("../models/playList");

//create Artist
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let newArtist = await new Artist({
        ...req.body,
    }).save();

    newArtist.__v = undefined;

    res
        .status(200)
        .send({ data: newArtist, message: "Account created successfully" });
});

router.get('/:id', async (req,res) => {
    const artist = await Artist.findById(req.params.id);
    res.status(200).send({ data: artist });
})

module.exports = router;