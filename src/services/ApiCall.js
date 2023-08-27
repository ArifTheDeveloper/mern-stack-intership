import axios from "axios";

export const commonrequest = async(methods,url,body,header) =>{
    let config = {
        method : methods,
        url,
        headers:header ? 
        header:{
            "Content-Type" : "application/json"
        },
        data : body
    }

    //axios instance
    return axios(config).then((data)=>{
        return data;
    }).catch((error)=>{
        return error;
    });
}

/*ye commmam function create kar liya, ye company me aaisa hi use hota hai,
jab v humme api call kar na hoga tab iss function ko call karega na ki bar bar hum pura code likhege   */

