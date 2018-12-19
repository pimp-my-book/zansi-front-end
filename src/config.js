const dev = {
    apiGateWay:{
        REGION: process.env.REACT_APP_REGION,
        URL: process.env.REACT_APP_API_ENDPOINT_DEV

    },
    cognito: {
        REGION: process.env.REACT_APP_REGION,
        USER_POOL_ID: process.env.REACT_APP_UserPoolID_Dev,
        APP_CLIENT_ID: process.env.REACT_APP_UserPoolClientID_Dev,
        IDENTITY_POOL_ID: process.env.REACT_APP_IdentityPoolId_Dev,

    }
}

const prod = {
    apiGateWay:{
        REGION: process.env.REACT_APP_REGION,
        URL: process.env.REACT_APP_API_ENDPOINT_PROD
    },
    cognito: {
        REGION: process.env.REACT_APP_REGION,
        USER_POOL_ID: process.env.REACT_APP_UserPoolID_PROD,
        APP_CLIENT_ID: process.env.REACT_APP_UserPoolClientID_PROD,
        IDENTITY_POOL_ID: process.env.REACT_APP_IdentityPoolId_PROD,

}

const config = process.env.REACT_APP_STAGE === 'prod'
   ? prod
   : dev;


   export default{
       ...config
   };