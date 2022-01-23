import { makeRequest } from "../Axios";
import { AxiosResponse } from "axios";
import * as url from "../urls";

const surveyService = {
  submitSurvey: async (data: any) => {
    try {
      const response = (await makeRequest(
        url.answerUrl,
        "post",
        {},
        data
      )) as AxiosResponse<any>;
      return response.data;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
  getSurveys: async (params?: any) => {
    try {
      const response = (await makeRequest(
        url.surveyUrl,
        "get",
        {},
        {},
        params
      )) as AxiosResponse<any>;
      return response.data;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
  getSurveyDetail: async (id: any) => {
    try {
      const response = (await makeRequest(
          url.surveyUrl + id + "/",
          "get",
          {},
          {},
      )) as AxiosResponse<any>;
      return response.data;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
};

export default surveyService;
