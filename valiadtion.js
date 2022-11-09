

 const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      return re.test(convertToString(email)) ? true : false;
    
  };
  const convertToString = (value) => {
    return String(value).toLowerCase();
  };

   const validateName = (name) => {
    const re = /[A-Za-z0-9_]{1,15}/;
    if (name) {
      return (
        re.test(convertToString(name)) ? true : false
      );
    }
  };

  const validatePassword = (password) => {
    const re =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  
      return re.test(convertToString(password)) ? true : false;
    
  };

  
  module.exports = {validateEmail ,  validatePassword , validateName}