// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { signUpMiddleware } from "../common/validation";
import cognitoClient from "../libs/cognito";

const userPoolId = process.env.user_pool_id as string;

const handler: Handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  let { email } = JSON.parse(event.body!);
  const { password } = JSON.parse(event.body!);
  email = email.toLowerCase();

  // checking existing user in pool
  const existingUserParams = {
    UserPoolId: userPoolId,
    Username: email,
  };

  try {
    const userExist = await cognitoClient
      .adminGetUser(existingUserParams)
      .promise();

    if (userExist.Username && userExist.Username !== "undefined") {
      const response = {
        statusCode: 409,
        body: JSON.stringify(
          {
            message: `User with email - ${email} is exist, please use another email`,
          },
          null,
          2,
        ),
      };
      return response;
    }
  } catch (err) {
    console.log(err);
  }

  // creating a new user in user pool
  const paramsCreateUser = {
    UserPoolId: userPoolId,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
    // auto-confirmation user
    MessageAction: "SUPPRESS",
  };

  try {
    const responseCreatingUser = await cognitoClient
      .adminCreateUser(paramsCreateUser)
      .promise();

    // setting user password
    if (responseCreatingUser.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: userPoolId,
        Username: email,
        Permanent: true,
      };
      await cognitoClient.adminSetUserPassword(paramsForSetPass).promise();
    }
  } catch (err) {
    console.log(err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `User with email: ${email} created!`,
      },
      null,
      2,
    ),
  };

  return response;
};

const validatedHandler = middy(handler).use(signUpMiddleware());

export default validatedHandler;
