// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent } from "aws-lambda";
import Boom from "@hapi/boom";
import { v4 as uuid } from "uuid";
import parseMultipart from "parse-multipart";
import path from "path";
import FormData from "form-data";
import s3Client from "../libs/s3client";
import documentClient from "../libs/dynamodb";
import authenticateUserByToken from "../common/auth";

const bucketName = process.env.bucketName as string;
const tableName = process.env.tableName as string;

function extractFile(event: any) {
  const boundary = parseMultipart.getBoundary(event.headers["content-type"]);
  const parts = parseMultipart.Parse(
    Buffer.from(event.body, "base64"),
    boundary,
  );
  const [{ filename, data }] = parts;

  return {
    filename,
    data,
  };
}

function signFile(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const presignedPostParams = {
      Bucket: bucketName,
      Fields: {
        Key: key,
      },
    };
    s3Client.createPresignedPost(presignedPostParams, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({ url: data.url, fields: data.fields });
    });
  });
}

function sendFileToS3(url: string, fields: any, fileContent: any) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    Object.entries(fields).forEach(([field, value]) => {
      form.append(field, value);
    });
    form.append("file", fileContent);
    form.submit(url, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

async function saveImgNameToDB(username: string, filename: string) {
  const params = {
    TableName: tableName,
    Item: {
      // eslint-disable-next-line prettier/prettier
      "UserID": `${username}`,
      // eslint-disable-next-line prettier/prettier
      "imagesUrls": `${filename}`,
    },
  };
  const res = await documentClient.put(params).promise();
  if (!res) {
    throw Error(
      `There was an error inserting data by UserId of ${username} in table ${tableName}`,
    );
  }
  return filename;
}

const handler: Handler = async (event: APIGatewayEvent) => {
  const username = await authenticateUserByToken(event);

  if (!username) {
    return Boom.unauthorized("Access token required!");
  }

  if (!event.isBase64Encoded) {
    return Boom.badRequest("File isn't attached.");
  }

  if (!event.body) {
    return Boom.badRequest("File isn't attached.");
  }

  const { filename, data } = extractFile(event);

  const extname = path.extname(filename);
  const fileContent = data;
  const generatedFileName = uuid();
  const key = `${generatedFileName}${extname}`;

  try {
    const signedResponse = await signFile(key);

    const { url, fields } = signedResponse;

    await sendFileToS3(url, fields, fileContent);

    const dynamoDbResponse = await saveImgNameToDB(username, key);

    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `File ${dynamoDbResponse} was upload successfully.`,
        },
        null,
        2,
      ),
    };

    return response;
  } catch (error) {
    console.log(error);
    return Boom.badRequest(`${error}`);
  }
};

export default handler;
