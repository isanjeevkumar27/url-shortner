import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '../components/login'
import Signup from '../components/signup'
import { useNavigate } from 'react-router-dom'
import { UrlState } from '../context'
function Auth() {
  
  const [searchParams]=useSearchParams();
  const longlink=searchParams.get("createNew");
  const navigate=useNavigate();

  const {isAuthenticated,loading}=UrlState();
  //authenticated user should not be able to access this page and 
  //loading should be false before we check for authentication
  //loading means we are still fetching the user data from supabase and
  //we should not redirect the user until we have the data

  React.useEffect(()=>{
    if(!loading && isAuthenticated){
      navigate(`/dashboard${longlink ? `?createNew=${longlink}` : ''}`);
    }
  },[loading,isAuthenticated,navigate]);//these are the dependencies of useEffect,
  // we want to run this effect whenever any of these values change

  return (
      <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longlink?"Hold up Lets login first":"LogIn/SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="login">login</TabsTrigger>
    <TabsTrigger value="signup">signup</TabsTrigger>
  </TabsList>
  <TabsContent value="login">
    <Login />
  </TabsContent>
  <TabsContent value="signup">
    <Signup />
  </TabsContent>
</Tabs>
    </div>
  )
}

export default Auth