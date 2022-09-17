import AWS from "aws-sdk";

const cognitoClient = new AWS.CognitoIdentityServiceProvider();
export default cognitoClient;
