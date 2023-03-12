import { useState, useEffect } from "react";
import { BsMoonStars ,BsSun } from "react-icons/bs";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    const prefersDark = localStorage.getItem("prefers-dark")
    // Set the theme based on the value in local storage
    if (prefersDark) setIsDarkMode(true)
    else setIsDarkMode(false)
  },[])
  
  const handleClick = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem("prefers-dark")
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem("prefers-dark","true")
    }
    setIsDarkMode(prev => !prev)
  }
  
  return (
    <span onClick={handleClick} className="cursor-pointer grid place-content-center">
{
  isDarkMode ?  <BsMoonStars 
  /> : <BsSun />
}      
    </span>
  );
};

export default DarkModeToggle;