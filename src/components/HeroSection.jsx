"use client";
import { Button } from "@heroui/react";
import { motion } from "motion/react"

export default function HeroSection() {
  return (
    <section className="relative w-full bg-black py-24 px-6 lg:px-12 flex flex-col items-center text-center">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10" />

      <div className="max-w-4xl flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Connecting You with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Expert Legal Solutions
          </span>
        </h1>
        <motion.h1 
         animate={{rotate: 360}}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          Hire a Lawyer
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
          The seamless bridge between justice and those who seek it. 
          Hire a trusted lawyer for your needs, or manage your practice 
          by accepting new hiring requests instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            className="bg-white text-black font-semibold h-12 px-8"
            radius="md"
          >
            Find a Lawyer
          </Button>
          <Button 
            variant="bordered" 
            className="text-white border-gray-700 h-12 px-8"
            radius="md"
          >
            Join as a Lawyer
          </Button>
        </div>
      </div>
    </section>
  );
}