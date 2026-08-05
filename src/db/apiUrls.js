import { supabase } from "./superbase";
import {UAParser} from "ua-parser-js";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export async function getUrls(user_id){
    const { data,error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id",user_id)

    if(error){
        console.error(error.message);
        throw new Error("Unable to load URLs");
    }

    return data;
}
export async function deleteUrl(url_id){

    const { data,error } = await supabase
        .from("urls")
        .delete()
        .eq("id",url_id);

    if(error){
        console.error(error.message);
        throw new Error("Unable to delete URLs");
    }

    return data;
}




export async function createUrl({title,longUrl,customUrl,user_id},qrcode){

    const short_url=Math.random().toString(36).substring(2,8);
    const filename = `qr-${short_url}.png`;
    const { error:uploadError } = await supabase.storage
    .from('qrs')
    .upload(filename,qrcode);
    if(uploadError){
        throw new Error(uploadError.message);
    }

    const qr=`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/qrs/${filename}`;

    const { data,error } = await supabase
        .from("urls")
        .insert([{
            title,
            original_url:longUrl,
            custom_url:customUrl||null,
            user_id,
            short_url,
            qr,
        }])
        .select();   // <-- required, or data will be null

    if(error){
        console.error(error.message);
        throw new Error("Unable/Error to create URL");
    }

    return data;
}



//short link map to long url

//here i dont know which id it is 
//it can be of short url or custom url so i will check both and return the long url

export async function getLongUrl(id){
    const { data,error } = await supabase
        .from("urls")
        .select("id,original_url")
        .or(`short_url.eq.${id},custom_url.eq.${id}`)
        .single();//returning single row it means if there are multiple rows it will return error

    if(error){
        console.error(error.message);
        throw new Error("Unable to fetch long URL");
    }

    return data;
}

// uaparse library

const { parse } = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const parser = new UAParser();
    const result = parser.getResult();
    const device = result.device.type || "desktop";

    const response = await fetch("https://ipapi.co/json/");
    const { city, country_name, ip } = await response.json();

    await supabase.from("clicks").insert([{
      url_id: id,
      city: city,
      country: country_name,
      device: device,
    }]);

    window.location.href = originalUrl;

  } catch (error) {
    console.error("Error storing clicks:", error.message);
  }
};

//we want info for url and clicks for that url

// export async function getUrl(id,user_id){//we can compare id with user_id to make sure that the url belongs to the user
//     const { data,error } = await supabase
//         .from("urls")
//         .select("*")//clicks(*) means we want all the clicks for that url
//         .eq("id",id)///id of the url
//         .eq("user_id",user_id)//id of the user
//         .single();//single means we want only one row if there are multiple rows it will return error

//         if(error){
//             console.log(error.message);
//             throw new Error("Unable to fetch URL with clicks");
//         }
// return data;
// }

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Unable to fetch URL with clicks");
  }
  return data;
}