const vision = require('@google-cloud/vision');

exports.visionapidemo = async (event, context) => {
    const file = event;
    console.log('Processing file: ' + file.bucket + "/" + file.name);

    const client = new vision.ImageAnnotatorClient();

    const request = {
        image: {
            source: {
                imageUri: `gs://${file.bucket}/${file.name}`
            }
        }
    };

    try {
        const [result] = await client.labelDetection(request);
        const labels = result.labelAnnotations;
        console.log("Labels found for " + file.name + JSON.stringify(labels));
        const filename = file.name;
        labels.forEach(label => {
            console.log(`${filename}, Label: ${label.description}, Score: ${label.score}`);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
};
