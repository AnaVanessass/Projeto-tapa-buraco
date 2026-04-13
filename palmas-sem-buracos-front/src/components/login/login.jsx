function Login (){
  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleLoginGithub = () =>{
    window.location.href ="http://localhost:8080/oauth2/authorization/github";
  }

  const handleLoginFacebook = () =>{
    window.location.href ="http://localhost:8080/oauth2/authorization/facebook";
  }
  return (
    <div className="login-container">
      <h1>Entrar no Sistema</h1>
      <button onClick={handleLoginGoogle}>Entrar com Google</button>
      <button onClick={handleLoginGithub}>Entrar com GitHub</button>
      <button onClick={handleLoginFacebook}>Entrar com Facebook</button>
    </div>
  );
};

export default Login;