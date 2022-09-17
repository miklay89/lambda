// eslint-disable-next-line import/no-unresolved
import { APIGatewayEvent } from "aws-lambda";
import cognitoClient from "../libs/cognito";

export default async function authenticateUserByToken(event: APIGatewayEvent) {
  if (!event.headers.authorization) {
    return null;
  }

  const token = event.headers.authorization.split(" ")[1];

  try {
    const user = await cognitoClient.getUser({ AccessToken: token }).promise();
    console.log(user.Username, "logged in");
    return user.Username;
  } catch (err) {
    console.log(err);
    return null;
  }
}
