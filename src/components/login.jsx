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
import { login } from '../db/apiAuth'
import useFetch from '../hooks/use-fetch'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../context'

function Login() {
  
  const [errors,seterror]=React.useState({})
  
  const [formData,setFormData]=React.useState({
    email:"",
    password:"",
  });
  
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
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
// useFetch(login, formData)
//         │
//         ▼
// cb = login
// options = formData
//         │
//         ▼
// returns fn
//         │
//         ▼
// fn renamed to fnLogin
//         │
//         ▼
// User clicks Login
//         │
//         ▼
// fnLogin()
//         │
//         ▼
// setLoading(true)
//         │
//         ▼
// login(formData)
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


  const { data, error,loading,fn:fnLogin } = useFetch(login, formData);
  const {fetchUser}=UrlState();

  useEffect(() => {
    console.log('Data:', data);
    if (error===null&&data) {
      // Handle successful login, e.g., redirect or show a success message
      navigate(`/dashboard${longlink ? `?createNew=${longlink}` : ''}`);
      fetchUser(); // Fetch the current user after successful login
      console.log('Login successful:', data);
    }
  }, [data,error]);

  ////////new
  
  const handleLogin=async()=>{
    seterror({}); 
    try {
      const schema=Yup.object().shape({
        email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required")
      });
      await schema.validate(formData,{abortEarly:false});
      //api call
      await fnLogin();
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
    <CardTitle>Login</CardTitle>
    <CardDescription>to your account if you already have one</CardDescription>
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
        <input type="password" 
        placeholder="Enter your password" 
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" />
        {errors.password && <Error message={errors.password} />}
    </div>
  </CardContent>
  <CardFooter>
    <Button block onClick={handleLogin} className="w-full">
        {loading?<BeatLoader color="#ffffff" size={8} />:"Login"} 
        
        </Button>
    </CardFooter>
</Card>
    </div>
  )
}

export default Login