/* eslint-disable camelcase */
// eslint-disable-next-line import/no-unresolved
import { Handler, SQSEvent, SQSRecord } from "aws-lambda";
import { Client } from "pg";
import dbConfig from "../libs/db";

interface Body {
  user_id: string;
  shop_id: string;
  query: string;
}

async function handleRecord(record: SQSRecord) {
  const body: Body = JSON.parse(record.body);
  const { user_id, shop_id, query } = body;
  const queryString = `INSERT INTO ${process.env.DB_SHOP_QUERY_TABLE} (user_id, shop_id, query) VALUES ('${user_id}', '${shop_id}', '${query}')`;

  const client = new Client(dbConfig);
  await client
    .connect()
    .then(() => client.query(queryString))
    .catch((err) => console.log("Client submiting query error - ", err))
    .finally(() => {
      client.end();
    });
}

const handler: Handler = async (event: SQSEvent) => {
  const promise: any[] = [];
  event.Records.forEach((record) => {
    promise.push(handleRecord(record));
  });

  await Promise.all(promise).catch((err) => console.log(err));

  return {};
};

export default handler;
