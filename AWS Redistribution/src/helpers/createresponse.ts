/* eslint-disable camelcase */
export default function createResponse(data: string, status_code: number) {
  return {
    statusCode: status_code,
    body: JSON.stringify(
      {
        message: data,
      },
      null,
      2,
    ),
  };
}
