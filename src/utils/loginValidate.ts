import { LoginFormValues } from "@/types/formValues";

const loginValidate = (values: LoginFormValues) => {
    const errors: Partial<{
        email: string;
        password: string;
    }> = {
        
    }
    
    if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      
      if(!values.password) {
        errors.password = "Required";
      } else if(values.password.length < 8 
        || 
        values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters long";
      } else if (values.password.includes(" ")) {
        errors.password = "Must not contain spaces in between"
      }
      
      return errors;
}

export default loginValidate;