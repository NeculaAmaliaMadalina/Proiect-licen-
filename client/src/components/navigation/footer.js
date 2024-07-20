import React from "react";
import ContactsIcon from "@mui/icons-material/Contacts";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const site = useSelector((state) => state.site);
  return (
    <footer>
      <div className="container">
        <div className="wrapper_footer_avantaj">
          <div className="footer_avantaj">
            <div className="icon_footer">
              <LocalShippingIcon className="image" />
            </div>
            <strong>Livrare gratuita</strong>
            <p>Pentru comenzile de peste 250 lei</p>
          </div>
          <div className="footer_avantaj">
            <div className="icon_footer">
              <CalendarMonthIcon className="image" />
            </div>
            <strong>14 zile termen de retur</strong>
            <p>Ai la dispozitie 14 zile pentru returnarea produselor</p>
          </div>
          <div className="footer_avantaj">
            <div className="icon_footer">
              <AccessTimeIcon className="image" />
            </div>
            <strong>Livrare rapida</strong>
            <p>Livrarea va ajunge in maxim 3 zile lucratoare</p>
          </div>
        </div>
      </div>
      <div className="header bg-dark text-white p-3">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/images/Magic2.ico" alt="logo" />
          </Link>
          {site && site.vars ? (
            <div className="wrapper">
              <div className="left">
                <h2>Informații de contact</h2>
                <div className="business_nfo">
                  <div className="tag">
                    <ContactsIcon />
                    <div className="nfo">
                      <div>Adresa</div>
                      <div>{site.vars.address}</div>
                    </div>
                  </div>
                  <div className="tag">
                    <PhoneIcon />
                    <div className="nfo">
                      <div>Telefon</div>
                      <div>{site.vars.phone}</div>
                    </div>
                  </div>
                  <div className="tag">
                    <TimelapseIcon />
                    <div className="nfo">
                      <div>Orar</div>
                      <div>{site.vars.hours}</div>
                    </div>
                  </div>
                  <div className="tag">
                    <EmailIcon />
                    <div className="nfo">
                      <div>Email</div>
                      <div>{site.vars.email}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h2>Informatii necesare</h2>
                <div className="business_nfo">
                  <div className="tag">
                    <Link to="/about_retur">
                      <div className="nfo">
                        <div>Politica de retur</div>
                      </div>
                    </Link>
                  </div>
                  <div className="tag">
                    <Link to="/delivery">
                      <div className="nfo">
                        <div>Politica de livrare</div>
                      </div>
                    </Link>
                  </div>
                  <div className="tag">
                    <Link to="/about_confitentiality">
                      <div className="nfo">
                        <div>Politica de confidentialitate</div>
                      </div>
                    </Link>
                  </div>
                  <div className="tag">
                    <Link to="/terms_and_conditions">
                      <div className="nfo">
                        <div>Termeni si conditii</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
