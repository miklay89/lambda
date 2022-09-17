// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent } from "aws-lambda";
import Boom from "@hapi/boom";
import middy from "@middy/core";
import s3Client from "../libs/s3client";
import authenticateUserByToken from "../common/auth";
import { deleteImgMiddleware } from "../common/validation";
import documentClient from "../libs/dynamodb";

const bucketName = process.env.bucketName as string;
const tableName = process.env.tableName as string;

async function deleteFromS3(filename: string) {
  const params = {
    Bucket: bucketName,
    Key: `${filename}`,
  };

  await s3Client
    .deleteObject(params)
    .promise()
    .catch((err) => console.log("Deleting from S3 error - ", err));
}

async function deleteFromDB(userId: string, filename: string) {
  const params = {
    TableName: tableName,
    Key: {
      UserID: userId,
      imagesUrls: filename,
    },
  };

  await documentClient
    .delete(params)
    .promise()
    .catch((err) => console.log("Deleting from DB error - ", err));
}

const handler: Handler = async (event: APIGatewayEvent) => {
  const username = await authenticateUserByToken(event);

  if (!username) {
    return Boom.unauthorized("Access token required!");
  }

  const { filename } = JSON.parse(event.body!);

  try {
    await deleteFromS3(filename);
    await deleteFromDB(username, filename);
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `File ${filename} was deleted successfully from S3.`,
        },
        null,
        2,
      ),
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2,
      ),
    };
    return response;
  }
};

const validatedHandler = middy(handler).use(deleteImgMiddleware());

export default validatedHandler;
