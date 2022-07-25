import axios from "axios";

export default async function getDataFromApi(url: string, params: object) {
  try {
    const response = await axios.post(url, null, { params });
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}
