module.exports = {
  aws: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || '123445',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'xKvn2409DJKAL',
    REGION: process.env.REGION || 'ap-southeast-1',
    BUCKET_NAME: process.env.BUCKET_NAME || 'bucket-name',
    S3_URL: process.env.S3_URL || 'https://s3-ap-southeast-1.amazonaws.com/bucket-name',
  },
};
