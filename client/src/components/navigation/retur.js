import React from "react";

const Retur = () => {
  return (
    <div>
      <div className="banner">
        <img src="/images/banner1.png" alt="banner" />
      </div>
      <div className="delivery_container">
        <div className="title">
          <h2>
            <b>Politica de retur</b>
          </h2>
        </div>
        <div className="content_container">
          <p>
            Termenul pentru plasarea unei solicitari de retur este de 14 de zile
            de la primirea comenzii.
          </p>
          <p>
            Dacă dorești să returnezi un produs, te rugăm să ții cont de
            următoarele:
          </p>
          <p>
            Toate produsele returnate trebuie să fie în aceeași stare în care
            le-ai primit.{" "}
          </p>
          <p>
            Din motive de igienă, lenjeria intimă/costumele de baie, body-urile,
            nu se pot returna.
          </p>
          <p>
            Când primim pachetul, vom inspecta starea produselor înainte de a
            procesa rambursarea produselor returnate.
          </p>
          <p>
            După verificarea produselor returnate, dacă ambalajul original este
            intact și produsul nu prezintă semne vizibile de folosință, vom
            returna în termen de 14 zile calendaristice contravaloarea acestora.
          </p>
          <p>
            Pentru a trimite retur produsele este necesar să completați
            formularul online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Retur;
