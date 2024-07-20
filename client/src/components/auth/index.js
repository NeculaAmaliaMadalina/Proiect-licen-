import React, { useState } from "react";
import { Button } from "@mui/material";
import AuthForm from "./authForm";
import PreventSignIn from "../../hoc/preventSignIn";

const RegisterLogin = (props) => {
  const [formType, setFormType] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const resetForgotPassword = () => {
    setForgotPassword(false);
  };

  const toogleFormType = () => {
    resetForgotPassword();
    setFormType(!formType);
  };

  return (
    <PreventSignIn>
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              {formType ? (
                <>
                  <h1>Bine ați venit în comunitatea noastră!</h1>
                  <p>
                    Ne bucurăm să vă avem alături și vă mulțumim că ați ales să
                    vă creați un cont în magazinul nostru. Suntem dedicați să vă
                    oferim cea mai bună experiență de cumpărături online și să
                    vă facem să vă simțiți ca acasă. De la produsele noastre de
                    înaltă calitate la serviciul nostru clienți de primă clasă,
                    ne străduim să vă oferim tot ce aveți nevoie pentru a vă
                    bucura de cumpărături fără griji și plăcute.
                  </p>
                </>
              ) : (
                <>
                  <h1>Bine ați revenit!</h1>
                  <p>
                    Suntem încântați să vă vedem din nou în magazinul nostru! Vă
                    mulțumim că ați ales să reveniți și suntem aici pentru a vă
                    oferi o experiență de cumpărături plăcută. Continuați să
                    explorați și să vă bucurați de produsele noastre de înaltă
                    calitate. Vă mulțumim pentru încrederea acordată!
                  </p>
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => toogleFormType()}
              >
                {formType ? "Ai deja cont?" : "Nu am cont"}
              </Button>
            </div>
            <div className="right">
              {formType ? <h1>ÎNREGISTREAZĂ-TE </h1> : <h1>CONECTEAZĂ-TE</h1>}
              <AuthForm
                formType={formType}
                resetForgotPassword={resetForgotPassword}
                {...props}
              />
            </div>
          </div>
        </div>
      </div>
    </PreventSignIn>
  );
};

export default RegisterLogin;
