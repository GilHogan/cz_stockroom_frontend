import JSEncrypt from "jsencrypt";
import Constants from "@/constant/constants";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
...example...
-----END PUBLIC KEY-----`

export const encrypt = (source: string, key = PUBLIC_KEY): string | false => {
  const crypt: JSEncrypt = new JSEncrypt({});
  crypt.setPublicKey(key);
  return crypt.encrypt(source);
}

export const sign = (): string | false => {
  const str = "...example...";
  return encrypt(str);
}
