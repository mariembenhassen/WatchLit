import React from "react";
import { footerStyles } from "../assets/dummyStyles";
import {
  ChevronRight,
  Clock,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Watch,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.topBorder}>
        {/* Pattern overlay */}
        <div className={footerStyles.patternOverlay}></div>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="watchPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#watchPattern)"
          />
        </svg>
      </div>
      <div className={footerStyles.mainContainer}>
        {/*newsletterSection */}
        <div className={footerStyles.newsletterSection}>
          <div className={footerStyles.newsletterContent}>
            <h3 className={footerStyles.newsletterTitle}>
              Timelesss Elegence , Delivered
            </h3>
            <p className={footerStyles.newsletterText}>
              Subscribe to our newsletter fro exclusive offers , new Collection
              announcements , and styling tips.
            </p>
            <div className={footerStyles.formContainer}>
              <input
                type="email"
                placeholder="Enter your email"
                className={footerStyles.emailInput}
              ></input>
              <button className={footerStyles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/*main footer */}
        <div className={footerStyles.mainGrid}>
          <div className={footerStyles.brandSection}>
            <div className={footerStyles.brandContainer}>
              <div className={footerStyles.brandIconContainer}>
                <div className={footerStyles.brandIconPing}></div>
                <Watch className={footerStyles.brandIcon}></Watch>
              </div>
              <span className={footerStyles.brandName}>ChronoLit</span>
            </div>
            <p className={footerStyles.brandDescription}>
              Where timeless elegance meets modern precision. Discover luxury
              watches that tell more than time, they tell your story.
            </p>
            <div className={footerStyles.socialIconsContainer}>
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a href="#" key={index} className={footerStyles.socialIcon}>
                  <Icon className={footerStyles.socialIconInner} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Link  */}
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon}></ChevronRight>
              Explore
            </h3>
            <u1 className={footerStyles.linksList}>
              {[
                { label: "Collections", href: "/watches" },
                { label: "New Arrivals", href: "/watches" },
                { label: "Best Sellers", href: "/watches" },
                { label: "Limited Editions", href: "/watches" },
                { label: "Our Story", href: "/watches" },
              ].map((item) => (
                <li key={item.label} className="supportList">
                  <a href={item.href} className={footerStyles.linkItem}>
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item.label}
                  </a>
                </li>
              ))}
            </u1>
          </div>
          {/* Customer service */}
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Support
            </h3>
            {
              <u1 className={footerStyles.linksList}>
                {[
                  "Contact Us",
                  "Shipping & Returns",
                  "Product Care",
                  "Warranty",
                  "FAQ",
                ].map((item) => (
                  <li key={item} className="supportList">
                    <a href="#" className={footerStyles.supportLink}>
                      <ChevronRight
                        className={footerStyles.linkIcon}
                      ></ChevronRight>
                      {item}
                    </a>
                  </li>
                ))}
              </u1>
            }
          </div>
          {/* Contact Info */}
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Connect
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  123 Luxury Avenue, Geneva, Switzerland
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  +41 22 345 6789
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  info@chronoelite.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* *buttom lines*/}
        <div className={footerStyles.bottomSection}>
          <p className={footerStyles.copyright}>
            &copy ; {new Date().getFullYear()} ChronoLit. Craftred with {""}
            <Heart className={footerStyles.heartIcon} /> in Tunisia
          </p>
          <div className=" flex flex-wrap justify-center gap-2">
            <p className={footerStyles.designerLink}>
              Designed by {""}
              <a
                href="https://www.linkedin.com/in/mariem-ben-hassen-8bb5ab2a4/"
                target="_blank"
                className={footerStyles.linkHover}
              >
                Mariem Ben Hassen
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
