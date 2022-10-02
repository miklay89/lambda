/* eslint-disable camelcase */
import shopId from "../libs/shopid";

export default function shopIdChecker(shop_id: string) {
  return shopId.find((element) => element.shop_id === shop_id);
}
