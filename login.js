// login.js
import { useEffect } from 'react';
import { web3Auth, setupWeb3Auth } from './web3auth';

const Login = () => {
  useEffect(() => {
    setupWeb3Auth();
  }, []);

  const handleLogin = async () => {
    try {
      await web3Auth.connect();
      const userInfo = await web3Auth.getUserInfo();
      console.log(userInfo);
      await saveUserInfo(userInfo);  // Save user info via an API call
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const saveUserInfo = async (userInfo) => {
    const response = await fetch('/api/saveUserInfo', {  // Ensure this matches the API route file name and path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    console.log('User information saved successfully!');
  };

  return <button onClick={handleLogin}>Login with Web3Auth</button>;
};

export default Login;
