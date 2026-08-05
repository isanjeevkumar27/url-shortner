import React from 'react'
import { supabase } from "./superbase";
import.meta.env.VITE_SUPABASE_URL;
export async function login({email,password}){
    const{data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error){
        throw new Error(error.message);
    }

    return data;
}

//we dont need to get the user detail from local storage 
//because supabase has a method to get the current user



// session = {
//   session: {
//     access_token: "...",
//     refresh_token: "...",
//     user: {
//       id: "...",
//       email: "abc@example.com"
//     }
//   }
// }

export async function getCurrentUser(){
    const { data:session,error } = await supabase.auth.getSession();
    if(!session.session){
        return null;
    }
    if(error){
        throw new Error(error.message);
    }
    return session.session.user;
}


export async function Signup({name,email,password,profile_pic}){
    const filename=`dp-${name.split(" ").join("-")}-${Math.random()}`;
    const { error:uploadError } = await supabase.storage
    .from('profile_pic')
    .upload(filename,profile_pic);
    if(uploadError){
        throw new Error(uploadError.message);
    }

    const {data,error} = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                name,
                profile_pic:`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile_pic/${filename}`
            }
        }
    });

    if(error){
        throw new Error(error.message);
    }
    return data;
}

export async function logout(){
    const {error} = await supabase.auth.signOut();
    if(error){
        throw new Error(error.message);
    }
}