import { userAuthenticate } from "./userInterceptor";


export const registerUser = async (data) => {
  const res = await userAuthenticate.post("/register", data);
  console.log("return of register",res)
  return res.data;
};

export const loginUser = async (data) => {
    console.log("hey hi ");
    
  const res = await userAuthenticate.post("/login", data);
  console.log(res,"return of login");
  
  return res.data;
};