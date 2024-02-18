import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Link from "next/link";

import { services } from "../constants";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 1.15,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[300px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[30px] font-semibold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const NavCards = () => {
  const links = ["/", "/board", "/tasklist"];
  return (
    <>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <Link href={links[index]} key={index}>
            <ServiceCard key={service.title} index={index} {...service} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavCards;
