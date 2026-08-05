import { supabase } from "./superbase";
import {UAParser} from "ua-parser-js";
export async function getClicksForUrls(urlIds){//taking array of urls
    const { data,error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id",urlIds);//in is used to filter the data based on the array of urlIds

    if(error){
        console.error(error.message);
        throw new Error("Unable to load clicks");
    }

    return data;
}
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

export async function getClicksForUrl(urlId) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", urlId);

    if(error) {
        console.error(error.message);
        throw new Error("Unable to load clicks for the URL");
    }
    return data;
}