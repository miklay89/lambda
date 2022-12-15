import axios from "axios";

export default async function getApiStatus<T>(url: string): Promise<T | null> {
  try {
    const res = await axios.get(url);
    if (res.status === 400) return null;
    return res.data as T;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
  return null;
}
