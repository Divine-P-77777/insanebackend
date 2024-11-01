// server/cloudinary.js
const cloudinary = require('cloudinary').v2; // Use require instead of import
const fs = require('fs'); // Keep fs as require, it's only for Node.js

cloudinary.config({ 
    cloud_name: 'dq84j4sxi', 
    api_key: "894476889383679", 
    api_secret: "ml3WNQdH1UGO-K8EpsY9-bKMfPQ", 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Define the upload path
        const uploadPath = path.join(__dirname, '../public/uploads', path.basename(localFilePath));

        // Save the file locally
        fs.copyFileSync(localFilePath, uploadPath); // Or any file save method you prefer

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(uploadPath, {
            resource_type: "auto"
        });

        // Optionally, delete the local file after upload
        fs.unlinkSync(uploadPath);

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};
module.exports = { uploadOnCloudinary }; // Use module.exports for CommonJS
