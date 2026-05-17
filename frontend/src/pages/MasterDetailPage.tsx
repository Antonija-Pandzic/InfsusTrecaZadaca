import { useEffect, useState } from "react";
import { Odjel } from "../types/Odjel";
import { Soba } from "../types/Soba";
import { TipSobe } from "../types/TipSobe";
import "../styles/masterDetail.css";
import { TipOdjela } from "../types/tipOdjela";
import { getTipoviOdjela } from "../api/tipOdjelaApi";
import { deleteTipOdjela } from "../api/tipOdjelaApi";


import {
  getSobeZaOdjel,
  createSoba,
  updateSoba,
  deleteSoba,
} from "../api/sobaApi";

import {
  getOdjeli,
  pretraziOdjele,
  createOdjel,
  updateOdjel,
  deleteOdjel,
} from "../api/odjelApi";

import { getTipoviSoba } from "../api/tipSobeApi";

const MasterDetailPage = () => {
  const [odjeli, setOdjeli] = useState<Odjel[]>([]);
  const [sobe, setSobe] = useState<Soba[]>([]);
  const [tipoviSoba, setTipoviSoba] = useState<TipSobe[]>([]);
  const [tipoviOdjela, setTipoviOdjela] = useState<TipOdjela[]>([]);

  const [odabraniOdjel, setOdabraniOdjel] = useState<Odjel | null>(null);
  const [sobaZaUredivanje, setSobaZaUredivanje] = useState<Soba | null>(null);

  const [pretraga, setPretraga] = useState("");
  const [poruka, setPoruka] = useState("");

  const [nazivOdjela, setNazivOdjela] = useState("");
  const [opisOdjela, setOpisOdjela] = useState("");
  const [tipOdjelaId, setTipOdjelaId] = useState(0);

  const [brojSobe, setBrojSobe] = useState("");
  const [kapacitet, setKapacitet] = useState(1);
  const [tipSobeId, setTipSobeId] = useState(0);

  const ucitajOdjele = async () => {
    const data = await getOdjeli();
    setOdjeli(data);
  };

  const ucitajTipoveSoba = async () => {
    const data = await getTipoviSoba();
    setTipoviSoba(data);

    if (data.length > 0) {
      setTipSobeId(data[0].tip_sobe_id);
    }
  };

  

  const ucitajTipoveOdjela = async () => {
  const data = await getTipoviOdjela();
  setTipoviOdjela(data);

  if (data.length > 0) {
    setTipOdjelaId(data[0].tip_odjela_id);
  }
};

  const ucitajSobe = async (odjelId: number) => {
    const data = await getSobeZaOdjel(odjelId);
    setSobe(data);
  };

useEffect(() => {
  ucitajOdjele();
  ucitajTipoveSoba();
  ucitajTipoveOdjela();
}, []);
  const handlePretraga = async () => {
    const data = await pretraziOdjele(pretraga);
    setOdjeli(data);
  };

  const odaberiOdjel = async (odjel: Odjel) => {
    setOdabraniOdjel(odjel);
    setNazivOdjela(odjel.naziv);
    setOpisOdjela(odjel.opis || "");
    setSobaZaUredivanje(null);
    setBrojSobe("");
    setKapacitet(1);
    setTipOdjelaId(odjel.tip_odjela_id);
    setPoruka("");
    await ucitajSobe(odjel.odjel_id);
  };

  const spremiOdjel = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let spremljeniOdjel;

      if (odabraniOdjel) {
        spremljeniOdjel = await updateOdjel(
        odabraniOdjel.odjel_id,
        nazivOdjela,
        opisOdjela,
        tipOdjelaId
);
       
        setPoruka("Odjel je uspješno ažuriran.");
      } else {
        spremljeniOdjel = await createOdjel(
        nazivOdjela,
        opisOdjela,
        tipOdjelaId
);
        setPoruka("Odjel je uspješno dodan.");
      }

      setOdabraniOdjel(spremljeniOdjel);
      await ucitajOdjele();
      await ucitajSobe(spremljeniOdjel.odjel_id);
    } catch (error: any) {
      setPoruka(error.response?.data?.poruka || "Greška kod spremanja odjela.");
    }
  };

  const noviOdjel = () => {
    setOdabraniOdjel(null);
    setNazivOdjela("");
    setOpisOdjela("");
    setSobe([]);
    setSobaZaUredivanje(null);
    setBrojSobe("");
    setKapacitet(1);
    setPoruka("Unesite podatke za novi odjel.");
  };

  const obrisiOdabraniOdjel = async () => {
    if (!odabraniOdjel) {
      setPoruka("Prvo odaberi odjel koji želiš obrisati.");
      return;
    }

    const potvrda = confirm("Jesi li sigurna da želiš obrisati odabrani odjel?");
    if (!potvrda) return;

    try {
      await deleteOdjel(odabraniOdjel.odjel_id);
      setPoruka("Odjel je uspješno obrisan.");
      noviOdjel();
      await ucitajOdjele();
    } catch (error: any) {
      setPoruka(
        error.response?.data?.poruka ||
          "Odjel se ne može obrisati ako postoje sobe koje pripadaju tom odjelu."
      );
    }
  };

  const popuniSobuZaUredivanje = (soba: Soba) => {
    setSobaZaUredivanje(soba);
    setBrojSobe(soba.broj_sobe);
    setKapacitet(soba.kapacitet);
    setTipSobeId(soba.tip_sobe_id);
    setPoruka(`Uređuje se soba ${soba.broj_sobe}.`);
  };

  const spremiSobu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!odabraniOdjel) {
      setPoruka("Prvo odaberi odjel.");
      return;
    }

    try {
      if (sobaZaUredivanje) {
        await updateSoba(
          sobaZaUredivanje.soba_id,
          brojSobe,
          kapacitet,
          odabraniOdjel.odjel_id,
          tipSobeId
        );
        setPoruka("Soba je uspješno ažurirana.");
      } else {
        await createSoba(
          brojSobe,
          kapacitet,
          odabraniOdjel.odjel_id,
          tipSobeId
        );
        setPoruka("Soba je uspješno dodana.");
      }

      setSobaZaUredivanje(null);
      setBrojSobe("");
      setKapacitet(1);
      await ucitajSobe(odabraniOdjel.odjel_id);
    } catch (error: any) {
      setPoruka(error.response?.data?.poruka || "Greška kod spremanja sobe.");
    }
  };

  const obrisiSobu = async (sobaId: number) => {
    const potvrda = confirm("Jesi li sigurna da želiš obrisati sobu?");
    if (!potvrda || !odabraniOdjel) return;

    try {
      await deleteSoba(sobaId);
      setPoruka("Soba je uspješno obrisana.");
      await ucitajSobe(odabraniOdjel.odjel_id);
    } catch (error: any) {
      setPoruka(error.response?.data?.poruka || "Greška kod brisanja sobe.");
    }
  };

  const odustaniOdSobe = () => {
    setSobaZaUredivanje(null);
    setBrojSobe("");
    setKapacitet(1);
    setPoruka("");
  };

  const obrisiTipOdjela = async () => {
  if (!tipOdjelaId) {
    setPoruka("Prvo odaberi tip odjela.");
    return;
  }

  const potvrda = confirm(
    "Jesi li sigurna da želiš obrisati odabrani tip odjela?"
  );

  if (!potvrda) return;

  try {
    await deleteTipOdjela(tipOdjelaId);

    setPoruka("Tip odjela je uspješno obrisan.");

    await ucitajTipoveOdjela();

    if (tipoviOdjela.length > 0) {
      setTipOdjelaId(tipoviOdjela[0].tip_odjela_id);
    }
  } catch (error: any) {
    setPoruka(
      error.response?.data?.message ||
        "Tip odjela se ne može obrisati jer se koristi u postojećim odjelima."
    );
  }
};
  return (
    <div>
      <h1>Sustav za upravljanje hospitalizacijom pacijenata</h1>

      <section className="container">
        <div className="panel">
          <h2>Popis odjela</h2>

          <input
            type="text"
            value={pretraga}
            onChange={(e) => setPretraga(e.target.value)}
            placeholder="Pretraži odjele..."
          />

          <button onClick={handlePretraga}>Pretraži</button>
          <button onClick={ucitajOdjele}>Prikaži sve</button>

          <div>
            {odjeli.map((odjel) => (
              <div
                key={odjel.odjel_id}
                className={
                  odabraniOdjel?.odjel_id === odjel.odjel_id
                    ? "odjel odjel-aktivan"
                    : "odjel"
                }
                onClick={() => odaberiOdjel(odjel)}
              >
                <strong>{odjel.naziv}</strong>
                <br />
                <span>{odjel.opis || ""}</span>
              </div>
            ))}
          </div>

          <div className="master-box">
            <h3>Uređivanje odjela</h3>

            <form onSubmit={spremiOdjel}>
              <label>
                Naziv odjela:
                <input
                  type="text"
                  value={nazivOdjela}
                  onChange={(e) => setNazivOdjela(e.target.value)}
                  required
                />
              </label>

              <label>
                Opis odjela:
                <input
                  type="text"
                  value={opisOdjela}
                  onChange={(e) => setOpisOdjela(e.target.value)}
                />
              </label>

              <label>
  Tip odjela:
  <select
    value={tipOdjelaId}
    onChange={(e) => setTipOdjelaId(Number(e.target.value))}
  >
 
    {tipoviOdjela.map((tip) => (
      <option
        key={tip.tip_odjela_id}
        value={tip.tip_odjela_id}
      >
        {tip.naziv}
      </option>
    ))}
  </select>
</label>

              <div className="button-row">
                <button type="submit">Spremi odjel</button>
                <button type="button" onClick={noviOdjel}>
                  Novi odjel
                </button>
                <button type="button" onClick={obrisiOdabraniOdjel}>
                  Obriši odjel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="panel">
          <h2>Sobe odabranog odjela</h2>

          <p id="odabraniOdjelTekst">
            {odabraniOdjel
              ? `Odabrani odjel: ${odabraniOdjel.naziv}`
              : "Nije odabran odjel."}
          </p>

          <table>
            <thead>
              <tr>
                <th>Broj sobe</th>
                <th>Kapacitet</th>
                <th>Tip sobe</th>
                <th>Akcija</th>
              </tr>
            </thead>

            <tbody>
              {sobe.map((soba) => (
                <tr key={soba.soba_id}>
                  <td>{soba.broj_sobe}</td>
                  <td>{soba.kapacitet}</td>
                  <td>{soba.tip_sobe}</td>
                  <td>
                    <button onClick={() => popuniSobuZaUredivanje(soba)}>
                      Uredi
                    </button>
                    <button onClick={() => obrisiSobu(soba.soba_id)}>
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="detail-form">
            <h3>Dodaj / uredi sobu</h3>

            <form onSubmit={spremiSobu}>
              <label>
                Broj sobe:
                <input
                  type="text"
                  value={brojSobe}
                  onChange={(e) => setBrojSobe(e.target.value)}
                  required
                />
              </label>

              <label>
                Kapacitet:
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={kapacitet}
                  onChange={(e) => setKapacitet(Number(e.target.value))}
                  required
                />
              </label>

              <label>
                Tip sobe:
                <select
                  value={tipSobeId}
                  onChange={(e) => setTipSobeId(Number(e.target.value))}
                >
                  {tipoviSoba.map((tip) => (
                    <option key={tip.tip_sobe_id} value={tip.tip_sobe_id}>
                      {tip.naziv}
                    </option>
                  ))}
                </select>
              </label>

              <div className="button-row">
                <button type="submit">
                  {sobaZaUredivanje ? "Spremi promjene" : "Dodaj sobu"}
                </button>
                <button type="button" onClick={odustaniOdSobe}>
                  Odustani
                </button>
              </div>
            </form>
          </div>

          <p id="poruka">{poruka}</p>
        </div>
      </section>
    </div>
  );
};

export default MasterDetailPage;