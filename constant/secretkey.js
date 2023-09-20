const secretKey = {
    "DB_NAME": process.env.DB_NAME,
    "DB_USERNAME": process.env.DB_USERNAME,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": process.env.DB_PORT,
    "GOOGLE_DRIVE_CLIENT_ID": process.env.GOOGLE_DRIVE_CLIENT_ID,
    "GOOGLE_DRIVE_CLIENT_SECRET": process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    "GOOGLE_DRIVE_REDIRECT_URI": process.env.GOOGLE_DRIVE_REDIRECT_URI,
    "GOOGLE_DRIVE_REFRESH_TOKEN": process.env.GOOGLE_DRIVE_REFRESH_TOKEN
}

module.exports = secretKey
