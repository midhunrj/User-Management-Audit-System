const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); 
const authconfig={
    accessTokenSecret  : process.env.ACCESS_TOKEN_SECRET ,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET , 
    accessTokenExpiry  : '10m' ,
    refreshTokenExpiry : '7d' ,
    
    
    async hashPassword(password)
    {
      return await bcrypt.hash(password,10)
    },
    async compare(password,hashedPassword)
    {
      return bcrypt.compare(password,hashedPassword)
    },

    generateAccessToken(payload){
      console.log(payload,"payload for generating AccessToken");
  
      return jwt.sign(payload,this.accessTokenSecret,{expiresIn:'1m'})
    },

    generateRefreshToken(payload){
        console.log(payload,"payload for generating refreshToken");

        return jwt.sign(payload,this.refreshTokenSecret,{expiresIn:'7d'})

    },

    verifyAccessToken(token){
      try{  
        console.log("kjhbhb"); 
      const decoded=jwt.verify(token,this.accessTokenSecret)
      console.log(decoded,"jhhgfhgf");
      
      return typeof decoded === "string" ?null:decoded
      }
      catch (error) {
        return null;
      }
    },

  verifyRefreshToken(token){
        try{
     const decoded=jwt.verify(token,this.refreshTokenSecret)
     return typeof decoded==="string"?null:decoded
    }
    catch (error) {
        return null;
      }
    },
    server_url:process.env.SERVER_URL
    
}

module.exports={authconfig}