// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
// import joi from "joi";
import middy from "@middy/core";
import middleware from "./validation";

export const handler: Handler = (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  const name = event.queryStringParameters?.name as string;
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello ${name}!`,
      },
      null,
      2,
    ),
  };

  return new Promise((resolve) => {
    resolve(response);
  });
};

export const hello = middy(handler).use(middleware());
