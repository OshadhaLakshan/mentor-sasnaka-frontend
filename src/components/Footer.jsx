import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="text-white font-primary shadow-lg">

    <div className="container flex flex-col md:flex-row justify-between items-center md:gap-8 max-w-screen-2xl mx-auto bg-gray-800">
            
        <div className="md:w-1/3 w-full">
            <ul className="container max-w-screen-2xl mx-auto px-10 py-5 flex-col md:flex-row justify-between items-center flex gap-10">
                <li><a href="mentorship" className="hover:text-primary">Mentorship</a></li>
                <li><a href="admin" className="hover:text-primary">Administrator</a></li>
                <li><a href="contact" className="hover:text-primary">Contact</a></li>
                <li><a href="whatsapp" className="hover:text-primary">WhatsApp</a></li>
            </ul>
        </div>

        <div className="md:w-1/3 w-full">
            <div className="max-w-screen-xl mx-auto px-10 m-4 flex flex-row justify-end items-center">
                <input type="email" placeholder="Subscribe to our NewsLetter..." className="w-[400px] px-4 py-2 rounded-l-md text-black" />
                <button href='#subscribe' className="bg-gray-400 px-6 py-2 text-black hover:text-white rounded-r-md hover:bg-black">Subscribe</button>
            </div>
        </div>

    </div>

    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between shadow-lg px-10 items-center py-6 bg-gray-900">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Mentor-Mentee Platform. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="oshadha.lakshan.7"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="oshadha.lakshan"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="oshadha.lakshan.7"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>   
        
    </footer>
  )
}

export default Footer