// eslint-disable-next-line import/no-unresolved
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import Boom from "@hapi/boom";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const signUpBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

export const signUpMiddleware = (): middy.MiddlewareObj<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    let response;
    if (!request.event.body) {
      response = Boom.badRequest("email and password required");
      return response;
    }
    const candidate = signUpBodySchema.validate(JSON.parse(request.event.body));
    if (Object.prototype.hasOwnProperty.call(candidate, "error")) {
      response = Boom.badRequest(`error: ${candidate.error}`);
      return response;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  return {
    before,
  };
};

const signInBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signInMiddleware = (): middy.MiddlewareObj<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    let response;
    if (!request.event.body) {
      response = Boom.badRequest("email and password required");
      return response;
    }
    const candidate = signInBodySchema.validate(JSON.parse(request.event.body));
    if (Object.prototype.hasOwnProperty.call(candidate, "error")) {
      response = Boom.badRequest(`error: ${candidate.error}`);
      return response;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  return {
    before,
  };
};

const deleteImgBodySchema = Joi.object({
  filename: Joi.string().required(),
});

export const deleteImgMiddleware = (): middy.MiddlewareObj<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayEvent,
    APIGatewayProxyResult
  > = async (request) => {
    let response;
    if (!request.event.body) {
      response = Boom.badRequest("filename required");
      return response;
    }
    const candidate = deleteImgBodySchema.validate(
      JSON.parse(request.event.body),
    );
    if (Object.prototype.hasOwnProperty.call(candidate, "error")) {
      response = Boom.badRequest(`error: ${candidate.error}`);
      return response;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  };

  return {
    before,
  };
};
