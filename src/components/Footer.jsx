import { Link } from "@heroui/react";
import Image from "next/image";
// Import the required icons from Gravity UI
import {LogoFacebook, LogoLinkedin, LogoGithub} from '@gravity-ui/icons';

const footerLinks = {
  product: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  navigations: ["Help center", "Career library", "Contact"],
  resources: ["Brand Guideline", "Newsroom"],
};

// Map names to icon components
const socialIcons = {
  Facebook: LogoFacebook,
  Pinterest: LogoGithub, // Using Facebook icon for Pinterest as a placeholder
  LinkedIn: LogoLinkedin,
};

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-900 py-12 px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/legal.png" alt="Legal Solutions Logo" width={100} height={32} className="rounded-lg" />
            <span className="text-white font-bold text-xl leading-tight">Legal <br /> Solutions</span>
          </div>
          <p className="text-gray-400 max-w-xs">
            The AI-native platform. Built for professionals who take their work seriously.
          </p>
          <div className="flex gap-3 mt-4">
            {Object.entries(socialIcons).map(([name, Icon]) => (
              <a 
                key={name} 
                href="#" 
                className="h-10 w-10 bg-gray-900 rounded-md flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 transition"
                aria-label={name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-4">
            <h3 className="text-blue-500 font-semibold capitalize">{title}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-sm">
        <p>© 2026 — Legal Solutions</p>
        <div className="flex gap-6">
          <Link href="#" className="text-gray-500 hover:text-white text-sm">Terms & Policy</Link>
          <Link href="#" className="text-gray-500 hover:text-white text-sm">Privacy Guideline</Link>
        </div>
      </div>
    </footer>
  );
}