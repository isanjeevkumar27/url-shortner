import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BeatLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup';
import { Signup } from '../db/apiAuth'
import useFetch from '../hooks/use-fetch'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../context'
function signup() {

  
  const [errors,seterror]=React.useState({})
  
  const [formData,setFormData]=React.useState({
    name:"",
    email:"",
    password:"",
    profile_pic:null,
  });
  
  const handleInputChange=(e)=>{
    const {name,value,files}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:files?.[0] || value
    }));
  }
  //////////////////new
  const navigate=useNavigate();
  let[searchParams]=useSearchParams();//it is possible
  //that user had sent the url as param so we want to send that as well
  const longlink=searchParams.get("createNew");


//   Component starts
//         │
//         ▼
// useFetch(Signup, formData)
//         │
//         ▼
// cb = Signup
// options = formData
//         │
//         ▼
// returns fn
//         │
//         ▼
// fn renamed to fnSignup
//         │
//         ▼
// User clicks Signup
//         │
//         ▼
// fnSignup()
//         │
//         ▼
// setLoading(true)
//         │
//         ▼
// Signup(formData)
//         │
//         ▼
// Supabase checks email/password
//         │
//         ▼
// Returns data
//         │
//         ▼
// setData(response)
//         │
//         ▼
// setLoading(false)


  const { data, error,loading,fn:fnSignup } = useFetch(Signup, formData);
  const {fetchUser}=UrlState();

  useEffect(() => {
    console.log('Data:', data);
    if (error===null&&data) {
      // Handle successful Signup, e.g., redirect or show a success message
      navigate(`/dashboard${longlink ? `?createNew=${longlink}` : ''}`);
      fetchUser(); // Fetch the current user after successful Signup
      console.log('Signup successful:', data);
    }
  }, [data,error,loading]);

  ////////new
  
  const handleSignup=async()=>{
    seterror({}); 
    try {
      const schema=Yup.object().shape({
        email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
        name: Yup.string()
        .required("Name is required"),
        profile_pic: Yup.mixed()
        .required("Profile picture is required")
      });
      await schema.validate(formData,{abortEarly:false});
      //api call
      await fnSignup();
    } catch (e) {
      const newError={};
      
      e?.inner?.forEach((err)=>{
        newError[err.path]=err.message;
      });
      
      seterror(newError);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
        <Card className="w-full">
  <CardHeader>
    <CardTitle>Signup</CardTitle>
    <CardDescription>create a account if you don't have one</CardDescription>
    {error && <Error message={error?.message} />}
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1">

        <input type="text" 
        placeholder="Enter your email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" />
        {errors.email && <Error message={errors.email} />}
    </div>
    <div className="space-y-1">

        <input type="text" 
        placeholder="Enter your name" 
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" />
        {errors.name && <Error message={errors.name} />}
    </div>
    <div className="space-y-1">
        <input type="password" 
        placeholder="Enter your password" 
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" />
        {errors.password && <Error message={errors.password} />}
    </div>
    <div className="space-y-1">
        <input type="file" 
        placeholder="Upload your profile picture" 
        name="profile_pic"
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm" />
        {errors.profile_pic && <Error message={errors.profile_pic} />}
    </div>
  </CardContent>
  <CardFooter>
    <Button block onClick={handleSignup} className="w-full">
        {loading?<BeatLoader color="#ffffff" size={8} />:"Create Account"} 
        
        </Button>
    </CardFooter>
</Card>
    </div>
  )
}

export default signup