// yah momma
import React, { useState } from 'react';

export default function Login()
{
  const app_name = 'cop4331-630-2024-18ab2ad6b8b8'
  function buildPath(route)
  {
    if (process.env.NODE_ENV === 'production')
    {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
      return 'http://localhost:5001/' + route;
    }
  }
  var loginName;
  var loginPassword;
  const [message,setMessage] = useState('');
  const doLogin = async event =>
  {
    event.preventDefault();
    var obj = {login:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch(buildPath('api/login'),
      {method:'POST',body:js,headers:{'Content-Type':
      'application/json'}});
      var res = JSON.parse(await response.text());
      if( res.id <= 0 )
      {
        setMessage('User/Password combination incorrect');
      }
      else
      {
        var user =
        {firstName:res.firstName,lastName:res.lastName,id:res.id}
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        window.location.href = '/cards';
      }
    }
    catch(e)
    {
      alert(e.toString());
      return;
    }
  };

  return(
    <div id="loginDiv">
      <span id="inner-title">PLEASE LOG IN</span><br />
      <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
      <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
      <input type="submit" id="loginButton" className="buttons" value = "Do It"
        onClick={doLogin} />
      <span id="loginResult">{message}</span>
    </div>
  );
};
