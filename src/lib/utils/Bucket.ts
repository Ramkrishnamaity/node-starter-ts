import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
    region: process.env.DIGITALOCEAN_SPACES_REGION,
    credentials: {
        accessKeyId: process.env.DIGITALOCEAN_ACCESS_KEY ?? "",
        secretAccessKey: process.env.DIGITALOCEAN_SECRET_KEY ?? "",
    },
    endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT ?? "",
})

async function pushOnBucket(file: Express.Multer.File, directory: string) {
    try {

        const command = new PutObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME,
            Key: directory,
            Body: file.buffer,
            ACL: "public-read",
        })

        await s3Client.send(command)
        

    } catch (error) {
        console.error("Error On upload: ", error)
        throw error
    }
}

async function pullFromBucket(directory: string) {
    try {

        const command = new DeleteObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME,
            Key: directory
        })

        await s3Client.send(command)

    } catch (error) {
        console.error("Error On upload: ", error)
        throw error
    }
}

const BucketUpload = {
    pushOnBucket,
    pullFromBucket
}

export default BucketUpload