// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent } from "aws-lambda";
import Boom from "@hapi/boom";
import documentClient from "../libs/dynamodb";
import authenticateUserByToken from "../common/auth";

const tableName = process.env.tableName as string;
const bucketName = process.env.bucketName as string;

interface DynamoDBItem {
  imagesUrls: string;
  UserID: string;
}

async function getDataFromDB(username: string) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: "UserID = :a",
    ExpressionAttributeValues: {
      // eslint-disable-next-line prettier/prettier
      ":a": `${username}`,
    },
  };

  const data = await documentClient.query(params).promise();

  if (!data || !data.Items) {
    throw Error(
      `There was an error fetching the data for UserID of ${username} from ${tableName}`,
    );
  }

  return data.Items;
}

function generateUrls(arr: any) {
  // https://myserverlessuploadimegesbucket-miklay.s3.amazonaws.com/5d528f2e-3cb2-4cad-9235-b20e2e5ff9ef.jpeg
  const generatedUrls: object[] = [];
  const urlString = `https://${bucketName}.s3.amazonaws.com/`;
  arr.forEach((element: DynamoDBItem) => {
    const imageName = element.imagesUrls;
    const generatedUrl = urlString + element.imagesUrls;
    const data = {
      filename: imageName,
      url: generatedUrl,
    };
    generatedUrls.push(data);
  });
  return generatedUrls;
}

const handler: Handler = async (event: APIGatewayEvent) => {
  const username = await authenticateUserByToken(event);

  if (!username) {
    return Boom.unauthorized("Access token required!");
  }

  try {
    const data = await getDataFromDB(username);

    if (data.length === 0) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: `You haven't any files stored in S3!`,
          },
          null,
          2,
        ),
      };
      return response;
    }

    const usersImgsAndUrls = generateUrls(data);

    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Hello, your image list is:`,
          usersImgsAndUrls,
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

export default handler;
