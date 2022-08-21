import React from 'react';
import {useNavigate} from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [firstName,setFirstName] =React.useState('');


  const submitHandler = async (e:any) => {
    e.preventDefault();

    console.log({
      username:username,
      password:password,
      firstName:firstName
    });

    const reqData = {
      username:username,
      password:password,
      firstName:firstName
    }

    const response = await fetch('http://localhost:9000/api/auth/register',{
      method:'POST',
      headers:{
       "Content-Type":'application/json',
       "Accept":"application/json"
      },
      body:JSON.stringify(reqData)
    });

    const result = await response.json();

    if(result.success){
      navigate('/signin')
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='useranmae' onChange={(e)=>setUsername(e.target.value)} />
        <input type="text" placeholder='firstName' onChange={(e)=>setFirstName(e.target.value)} />
        <input type="password" placeholder='password (8 characters min)' onChange={(e)=>setPassword(e.target.value)} />
        <input type="submit" value="submit" />
       </form>
    </div>
  );
}

export default SignUp;
