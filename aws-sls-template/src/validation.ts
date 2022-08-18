// eslint-disable-next-line import/no-unresolved
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import Joi from "joi";
import Boom from "@hapi/boom";

const schema = Joi.object({
  name: Joi.string().alphanum().required(),
});

const middleware = (): middy.MiddlewareObj<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const name = request.event.queryStringParameters?.name;
    const candidate = schema.validate({ name });
    if (Object.prototype.hasOwnProperty.call(candidate, "error")) {
      const response = Boom.badRequest(
        "Invalid query string parametr, it should be name=some_name",
      );
      return response;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  return {
    before,
  };
};

export default middleware;
