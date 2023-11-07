// import React, { useState } from 'react';
// import '../assets/css/Login.css';

// function Login() {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // Login logic
//   };

//   return (
//     <form onSubmit={handleLogin} className="login-form">
//       <input
//         type="text"
//         value={credentials.username}
//         onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={credentials.password}
//         onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;
