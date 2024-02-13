"use client";

import BearerExample from '../pages/BearerExample.jsx';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Button from '@/components/GrafbaseHoldovers/ButtonGrafbase.jsx';
import Dashboard from '@/components/Dashboard.jsx';
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";

function MyApp() {
  
  const [bearer, setBearer] = useState(
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : ""   // Initialize bearer state to the token stored in sessionStorage, unless empty
  );

  const [hasMounted, setHasMounted] = useState(false);  // Initialize hasMounted state to false. This is used to prevent rendering until the component has mounted
 
  useEffect(() => {                                     // useEffect hook that runs once after the component has mounted

    setHasMounted(true);                               // Set hasMounted to true indicating that the component has mounted
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');  // Get the token from sessionStorage
      // console.log('Token from sessionStorage:', token);

      if (token) {                                   // If the token exists, update the bearer state with the token
        setBearer(token);
      }
    }
  }, []);                                           // Empty dependency array means this effect runs once on mount and not on subsequent re-renders

  if (!hasMounted) {                                 // If the component has not mounted, do not render anything
    return null;
  }

  return (
    <>
            <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Dashboard />
        </motion.div>
    {/* // <section className="flex-start flex-col paddings mb-16"></section> */}


      

   
   </>
  );
}

export default MyApp;
