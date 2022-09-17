// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent } from "aws-lambda";
import middy from "@middy/core";
import cognitoClient from "../libs/cognito";
import { signInMiddleware } from "../common/validation";

const clientId = process.env.client_id as string;

const handler: Handler = async (event: APIGatewayEvent) => {
  const userPoolId = process.env.user_pool_id as string;
  let { email } = JSON.parse(event.body!);
  const { password } = JSON.parse(event.body!);
  email = email.toLowerCase();

  const authParams = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
    ClientId: clientId,
    UserPoolId: userPoolId,
  };

  try {
    const authResponse = await cognitoClient
      .adminInitiateAuth(authParams)
      .promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Auth succes!",
          token: authResponse.AuthenticationResult,
        },
        null,
        2,
      ),
    };

    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: "Incorect credentials",
          error: err,
        },
        null,
        2,
      ),
    };
    return response;
  }
};

const validatedHandler = middy(handler).use(signInMiddleware());

export default validatedHandler;
