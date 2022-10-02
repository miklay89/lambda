/* eslint-disable camelcase */
// eslint-disable-next-line import/no-unresolved
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { Client } from "pg";
import Boom from "@hapi/boom";
import dbConfig from "../libs/db";
import createResponse from "../helpers/createresponse";
import shopIdChecker from "../helpers/shopidchecker";

export const msgReceiverMiddleware = (): middy.MiddlewareObj<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const { user_id, shop_id, query } = JSON.parse(request.event.body!);

    // validating body
    if (!user_id || !shop_id || !query) {
      return Boom.badRequest(
        "Error: user_id, shop_id, query fields in body is require.",
      );
    }

    // checking shop_id
    if (!shopIdChecker(shop_id)) {
      return createResponse("Error: shop_id is invalid", 200);
    }

    // checking api usage
    const queryString = `Select count from ${process.env.DB_API_USAGE_TABLE} where shop_id='${shop_id}'`;
    const client = new Client(dbConfig);
    await client
      .connect()
      .catch((err) => console.log("Error conection - ", err));
    const result = await client.query(queryString);
    client.end();
    const api_usage_count = +result.rows[0].count;
    const api_usage_limit = process.env.API_USAGE_COUNT as string;
    if (api_usage_count >= +api_usage_limit) {
      return createResponse(
        `You have used all API calls in this month, you use API endpoint ${api_usage_count} times.`,
        200,
      );
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  const after: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const { shop_id } = JSON.parse(request.event.body!);
    const client = new Client(dbConfig);
    await client
      .connect()
      .catch((err) => console.log("Error conection - ", err));
    const apiUsageQueryString = `UPDATE ${process.env.DB_API_USAGE_TABLE} SET count = count + 1 WHERE shop_id='${shop_id}'`;
    await client.query(apiUsageQueryString);
    client.end();
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  return {
    before,
    after,
  };
};

export default msgReceiverMiddleware;
