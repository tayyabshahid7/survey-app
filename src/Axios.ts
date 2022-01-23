import axios, { AxiosRequestConfig } from "axios";

const BASE_URL: string = process.env.REACT_APP_BASE_URL || "";
export const axiosObj = axios.create();

export const makeRequest = (
  url: AxiosRequestConfig["url"],
  method: AxiosRequestConfig["method"],
  headers?: AxiosRequestConfig["headers"],
  body?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"]
) => {
  return new Promise((resolve, reject) => {
    axiosObj({

      url: BASE_URL + url,
      method: method,
      headers: headers,
      data: body,
      params,
    })
      .then((response: any) => {
        resolve(response);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
