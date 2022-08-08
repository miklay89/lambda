// url: https://mqkr9dd8ae.execute-api.eu-west-2.amazonaws.com/default/myFirstFunction
// query params: name=Oleg
// method: any
exports.handler = async (event) => {
  const name = event.queryStringParameters.name;
  const response = {
      statusCode: 200,
      body: JSON.stringify(`Hello ${name}!`),
  };
  return response;
};