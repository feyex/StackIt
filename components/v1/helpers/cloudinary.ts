const { config, v2 } = require('cloudinary');


const cloudinaryConfig = () => config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const uploader = v2.uploader;

export { cloudinaryConfig, uploader};