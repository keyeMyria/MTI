import axios from 'axios';
var base64 = require('base-64');

//dev
//const endpoint = "http://103.208.27.13/eRegister/API/";
const endpoint = "http://202.183.216.37/mti/api/";
//const endpoint = "https://mtimobile.campaignserv.com/api/";

//const endpoint = "http://apiilease.ddns.net/eRegister/API/"





import store from 'react-native-simple-store';
import app from '../stores/app';
import {
    Alert,Linking
} from 'react-native';


export async function authen(param){
  
  let requestURL = `${endpoint}token`;
  console.log("requestURL-----"+requestURL,"param: "+param);
      try{
          let credentials = await base64.encode("mticonnect"+":"+"QaZwSxEdCrFv");
          let BasicAuth = 'Basic ' + credentials;

          let response = await  axios.post(requestURL,param,{headers: {'Authorization':BasicAuth}});
          console.log(response);
          if(response.status==201 && response.data.status=='ok'){
            //let token = response.data;
            return response.data;
          }else{
                app.isLoading = false;
                setTimeout(()=>{Alert.alert(
                  'เกิดข้อผิดพลาด',
                  response.message,
                  [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                  ]
                ),100});
              return false;
          }
      }catch(e){
          console.log(e);
          app.isLoading = false;
          setTimeout(()=>{Alert.alert(
            'เกิดข้อผิดพลาด',
              e.response.data.message,
            [
            {text: 'OK'},
            ]
            ),100});
        return false;
          
      }
}
export async function post(path,param){
    const token = await store.get("token");
    let requestURL = `${endpoint}${path}`;
    console.log("requestURLrequestURL"+requestURL);
        try{
            console.log("param: "+JSON.stringify(param));
  
            let BasicAuth = 'Bearer ' + token;
  
            const response = await  axios.post(requestURL, param,{headers: {'Authorization':BasicAuth}});
            if(!response.data.message){
              console.log("postService"+JSON.stringify(response.data));
              return response.data;
            }else{
                app.isLoading = false;
                console.log(response.data.message);
                setTimeout(()=>{Alert.alert(
                    'เกิดข้อผิดพลาด',
                    response.data.message,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )},100);
                return false;
            }
        }catch(e){
      app.isLoading = false;
      console.log(e);
      setTimeout(()=>{Alert.alert(
        'เกิดข้อผิดพลาด',
        e.response.data.message,
        [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      )},100);
            return e;
        }
  }
  
export async function postBasic(path,param,customError){
  const token = await store.get("token");
  let requestURL = `${endpoint}${path}`;
  console.log("requestURLrequestURL"+requestURL);
      try{
          console.log("param: "+JSON.stringify(param));

          let credentials = await base64.encode("mticonnect"+":"+"QaZwSxEdCrFv");
          let BasicAuth = 'Basic ' + credentials;
          let response = await  axios.post(requestURL,param,{headers: {'Authorization':BasicAuth}});
          if(!response.data.message){
            console.log("postService"+JSON.stringify(response.data));
            return response.data;
          }else{
            app.isLoading = false;
            
              if(!customError){
                setTimeout(()=>{Alert.alert(
                    'เกิดข้อผิดพลาด',
                    response.data.message,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                ),1000});
              }
              return false;
             
          }
      }catch(e){
        app.isLoading = false;
        setTimeout(()=>{Alert.alert(
        'เกิดข้อผิดพลาด',
            e.response.data.message,
        [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
        ),1000});
          return false;
      }
}
export async function put(path,param){
    const token = await store.get("token");
    let requestURL = `${endpoint}${path}`;
    console.log("requestURLrequestURL"+requestURL);
        try{
            console.log("param: "+JSON.stringify(param));
  
            let BasicAuth = 'Bearer ' + token;
  
            const response = await  axios.put(requestURL, param,{headers: {'Authorization':BasicAuth}});
            if(!response.data.message){
              console.log("postService"+JSON.stringify(response.data));
              return response.data;
            }else{
                app.isLoading = false;
                console.log(response.data.message);
                setTimeout(()=>{Alert.alert(
                    'เกิดข้อผิดพลาด',
                    response.data.message,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )},100);
                return false;
            }
        }catch(e){
      app.isLoading = false;
      console.log(e);
      setTimeout(()=>{Alert.alert(
        'เกิดข้อผิดพลาด',
        e.response.data.message,
        [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      )},100);
            return e;
        }
  }

export async function get(path,param){
  const token = await store.get("token");
  var config = {
    headers: { 'Authorization': 'Bearer '+token }
  }
  let requestURL = `${endpoint}${path}`;
  
      try{
          let BasicAuth = 'bearer ' + token;
          const response = await axios.get(requestURL,config)
          if(!response.data.message){
            console.log("postService"+JSON.stringify(response));
            return response.data;
          }else{
              app.isLoading = false;
              console.log(response.data.message);
              setTimeout(()=>{Alert.alert(
                  'เกิดข้อผิดพลาด',
                  response.message,
                  [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                  ]
              ),100});
              return false;
          }
      }catch(e){
        app.isLoading = false;
        console.log(e);
          return false;
      }
}
