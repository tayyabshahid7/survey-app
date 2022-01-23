import axios, { AxiosRequestConfig } from "axios";

const BASE_URL: string = "https://survey-backend-application.herokuapp.com/";
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
