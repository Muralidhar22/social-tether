import { RegisterFormValues } from "@/types/formValues";

const registerValidate = (values: RegisterFormValues) => {
    const errors: Partial<RegisterFormValues> = {}
    
    if(!values.username) {
        errors.username = "Required"
    } else if (values.username.includes(" ")) {
        errors.username = "Invalid username!"
    }
    
    // validate email
    if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      
      // validate password
    
    if(!values.password) {
        errors.password = "Required";
      } else if(values.password.length < 8 
        || 
        values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters long";
      } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password"
      }
      
    //   validate confirm password
    
    if(!values.cpassword) {
        errors.cpassword = "Required";
      } else if(values.password !== values.cpassword) {
        errors.cpassword = "Password Not Match!"
      } else if (values.password.includes(" ")) {
        errors.cpassword = "Invalid Password"
      }
      
    return errors;
}

export default registerValidate;