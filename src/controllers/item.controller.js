const Item = require("../repositories/item.repository");

// const { Storage } = require("@google-cloud/storage");
// const path = require("path");

const BUCKET_NAME = "micro-enigma-235001.appspot.com/";
const SERVICE_KEY = "../../micro-enigma-235001-d4500fe55929.json";
const PROJECT_ID = "micro-enigma-235001";
// const serviceKey = path.join(__dirname, SERVICE_KEY);
// const storage = new Storage({
//     keyFilename: serviceKey,
//     projectId: PROJECT_ID,
// });
// const bucket = storage.bucket(BUCKET_NAME);

exports.getUnlimitedItem = async (req, res) => {
    Item.getUnlimitedItem((err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};

exports.getLimitedItem = async (req, res) => {
    Item.getLimitedItem((err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};

exports.create = async (req, res) => {
    const body = req.body;
    const file = req.file;
    
    if (!body || !file) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const blob = bucket.file("hero/images/" + file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });

    blobStream.on("error", (err) => {
        res.status(400).send("err", err);
        return;
    });

    blobStream.on("finish", async () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const newItem = { ...body, item: publicUrl };
        Item.create(newItem, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the Customer.",
                });
            else {
                res.send(data);
            }
        });
    });

    blobStream.end(req.file.buffer);
};

exports.update = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const itemId = req.params.id;
    const data = req.body;

    if (!itemId || !data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Item.update(itemId, data, (error, data) => {
            if (error)
                res.status(500).send({
                    error,
                });
            else {
                res.status(200).send(data);
            }
        });
    }
};

exports.delete = async (req, res) => {
    const itemId = req.params.id;

    if (!itemId) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Item.delete(itemId, (err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            res.send(data);
        }
    });
};
