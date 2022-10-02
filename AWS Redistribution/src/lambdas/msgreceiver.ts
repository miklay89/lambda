// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayEvent } from "aws-lambda";
import middy from "@middy/core";
import sqsClient from "../libs/sqs";
import createResponse from "../helpers/createresponse";
import msgReceiverMiddleware from "../middlewares/msgreceivermiddleware";

const queueUrl = process.env.queueUrl as string;

const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const messageBody = JSON.parse(event.body!);

    // send valid request to queue
    const params = {
      DelaySeconds: 0,
      MessageBody: JSON.stringify(messageBody),
      QueueUrl: queueUrl,
    };

    await sqsClient.sendMessage(params).promise();

    return createResponse("Data was submited.", 200);
  } catch (error) {
    console.log("Error in sending message to queue is - ", error);
    return createResponse(error as string, 400);
  }
};

const validatedHandler = middy(handler).use(msgReceiverMiddleware());

export default validatedHandler;
