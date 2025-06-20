import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const FooterLayout = () => {
  return (
    <Footer className="border border-t border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 rounded-lg text-white">Cuong's</span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://www.100jsprojects.com/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Project
                </FooterLink>
                <FooterLink
                  href="https://www.100jsprojects.com/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cuong's Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/masonnguyen1243"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterLink>
                <FooterLink
                  href="https://www.facebook.com/cuongwfxzje"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/masonnguyen1243"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </FooterLink>
                <FooterLink
                  href="https://www.facebook.com/cuongwfxzje"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Term & Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Cuong's Blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default FooterLayout;
