import AWS from "aws-sdk";

const documentClient = new AWS.DynamoDB.DocumentClient();
export default documentClient;
