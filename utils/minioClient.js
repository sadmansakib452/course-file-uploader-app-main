// utils/minioClient.js
const Minio = require("minio");

// MinIO client configuration
const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});

// Bucket name
const bucketName = "course-files";

// Ensure bucket exists, or create it
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error("Error checking bucket existence:", err);
    return;
  }

  if (!exists) {
    minioClient.makeBucket(bucketName, "us-east-1", (err) => {
      if (err) {
        console.error("Error creating bucket:", err);
        return;
      }
      console.log(`Bucket '${bucketName}' created successfully.`);
    });
  }
});

module.exports = minioClient;
