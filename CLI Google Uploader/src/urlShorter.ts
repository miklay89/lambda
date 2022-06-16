import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const headers = {
  "Content-Type": "application/json",
  "apikey": process.env.url_shorter_api_key as string,
}

export async function urlShorter(url: string) {
  let endpoint = "https://api.rebrandly.com/v1/links";
  let linkRequest = {
    destination: url,
    domain: { fullName: "rebrand.ly" }
    //, slashtag: "A_NEW_SLASHTAG"
    //, title: "Rebrandly YouTube channel"
  }
  const apiCall = {
      method: 'post',
      url: endpoint,
      data: linkRequest,
      headers: headers
  }
  let apiResponse = await axios(apiCall);
  let link = apiResponse.data;
  return link.shortUrl;
}