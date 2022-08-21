import React from 'react';
import {useNavigate} from 'react-router-dom';

function Signin(){
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');


    const submitHandler = async (e:any) => {
        e.preventDefault();
    
      
        const reqData = {
          username:username,
          password:password,

        }
    
        const response = await fetch('http://localhost:9000/api/auth/login',{
          method:'POST',
          headers:{
           "Content-Type":'application/json',
           "Accept":"application/json"
          },
          body:JSON.stringify(reqData)
        });
    
        const result = await response.json();
        
        if(result.success){

            localStorage.setItem('user',JSON.stringify(result.data));
            navigate('/')
        }
      };

    return(

        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder='useranmae' onChange={(e)=>setUsername(e.target.value)} />

          <input type="password" placeholder='password (8 characters min)' onChange={(e)=>setPassword(e.target.value)} />
          <input type="submit" value="submit" />
         </form>
      </div>
    )
};

export default Signin;