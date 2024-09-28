import instance from "./Axios";
import axios from "./Axios";



export const login1 = (formData: FormData) => {
  return axios.post('/mpd_api/login', formData);
};

export const failure = (formData: FormData, page:number,size:number) => {
  return axios.post(`/mpd_api/report/failureAnalysisReport?page=${page}&size=${size}` , formData)
};

export const history = (formData:FormData , page:number,size:number) => {
  return axios.post(`/mpd_api/report/NotificationHistoryReport?page=${page}&size=${size}` , formData)
};

