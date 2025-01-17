import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const footer = () => {
  return (
    <footer className='border-t p-4 '>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row lg:justify-between gap-2 text-center '>
        <p> &#169; All rights are Reserved. </p>

        <div className="flex gap-4 items-center justify-center text-2xl ">
        <a href="" className='hover:text-primary-100'><FaGithub /></a>
        <a href=""  className='hover:text-primary-100'><FaFacebookSquare /></a>
        <a href="" className='hover:text-primary-100'><FaInstagram /></a>
        <a href="" className='hover:text-primary-100'><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  )
}

export default footer
