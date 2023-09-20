const secretKey = require("../../constant/secretkey")
const {google} = require("googleapis")
const { Readable } = require('stream');

class GDriver {
  driveClient
  fileId = "1HJNSeLGDK7lKPzpBpJ981kZlTjqD9IZv"

  constructor() {
    this.driveClient = this.createDriveClient(secretKey.GOOGLE_DRIVE_CLIENT_ID, secretKey.GOOGLE_DRIVE_CLIENT_SECRET, secretKey.GOOGLE_DRIVE_REFRESH_TOKEN, secretKey.GOOGLE_DRIVE_REDIRECT_URI);
  }

  createDriveClient(clientId = "", clientSecret = "", refreshToken = "", redirectUri = "") {
    let client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    client.setCredentials({
      refresh_token: refreshToken
    });
    return google.drive({
      version: 'v3',
      auth: client,
    });
  }

  async saveFile(fileName = "", file, fileMimeType = "") {
    const fileStream = Readable.from(file);
    try {
      const response = await this.driveClient.files.create({
        requestBody: {
          name: fileName,
          mimeType: fileMimeType,
          parents: [this.fileId]
        },
        media: {
          mimeType: fileMimeType,
          body: fileStream,
        }
      });
      // The response will contain information about the created file,
      // including its ID
      const fileId = response.data.id;
      console.log(`File ID: ${fileId}`);
      return fileId;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

module.exports = {
  GDriver
}