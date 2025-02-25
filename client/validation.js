export const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,15}$/;  
    return regex.test(username);
  };
  
  export const validateEmail = (email) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  };
  
  export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    return regex.test(password);
  };
  