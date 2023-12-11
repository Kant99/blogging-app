import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL= 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here
        return processResponse(response);
    },function(error){
        //stop global loader
        return Promise.reject(processError(error));
    }
)

/////////////////////////////////////////////////
//If success-->return{isSuccess:true ,data:object}
//If fail-->return{isFailure:true,status:string,msg:string,code:int}
//////////////////////////////////////////////////
const processResponse= (response)=>{
if(response?.status >= 200 && response?.status < 300){
    return {
        isSuccess:true,
        data:response.data
    }
}
else{
    return{
        isFailure:true,
        status:response?.status,
        msg:response?.msg,
        code:response?.code
    }
}
}
/////////////////////////////////////////////////
//If success-->return{isSuccess:true ,data:object}
//If fail-->return{isFailure:true,status:string,msg:string,code:int}
//////////////////////////////////////////////////
const processError= (error)=>{
    if(error.response){
            //Request made successfully and server responded with a status other then 2xx
        console.log("error in response:", error.toJSON());
        return({
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        })
        }
    else if(error.request){
        //Request made but no response was recieved
        console.log("error in request:", error.toJSON());
        return({
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:error.response.status
        })
    }
    else{
        //Something happened in setting up requests that triggers an error
        console.log("error in network:", error.toJSON());
        return({
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        })
    }
}

const API={};
for(const [key,value]of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    }

    export {API}
