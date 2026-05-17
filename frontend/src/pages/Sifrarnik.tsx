import { useEffect, useState } from "react";

import { TipSobe } from "../types/TipSobe";
import { TipOdjela } from "../types/tipOdjela";

import TipSobeForm from "../components/TipSobeForm";
import TipSobeTable from "../components/TipSobeTable";

import TipOdjelaForm from "../components/TipOdjelaForm";
import TipOdjelaTable from "../components/TipOdjelaTable";

import {
  getTipoviSoba,
  createTipSobe,
  updateTipSobe,
  deleteTipSobe,
} from "../api/tipSobeApi";

import {
  getTipoviOdjela,
  createTipOdjela,
  updateTipOdjela,
  deleteTipOdjela,
} from "../api/tipOdjelaApi";

const TipoviSobaPage = () => {
  const [tipoviSoba, setTipoviSoba] = useState<TipSobe[]>([]);
  const [tipoviOdjela, setTipoviOdjela] = useState<TipOdjela[]>([]);

  const [odabraniTip, setOdabraniTip] = useState<TipSobe | null>(null);
  const [odabraniTipOdjela, setOdabraniTipOdjela] =
    useState<TipOdjela | null>(null);

  const [greska, setGreska] = useState("");

  const [pretraga, setPretraga] = useState("");
  const [pretragaTipovaOdjela, setPretragaTipovaOdjela] = useState("");


  const ucitajTipoveSoba = async () => {
    try {
      const data = await getTipoviSoba();
      setTipoviSoba(data);
    } catch {
      setGreska("Greška kod dohvaćanja tipova soba.");
    }
  };

  const ucitajTipoveOdjela = async () => {
    try {
      const data = await getTipoviOdjela();
      setTipoviOdjela(data);
    } catch {
      setGreska("Greška kod dohvaćanja tipova odjela.");
    }
  };

  useEffect(() => {
    ucitajTipoveSoba();
    ucitajTipoveOdjela();
  }, []);

  const handleSubmit = async (naziv: string, opis: string) => {
    try {
      setGreska("");

      if (odabraniTip) {
        await updateTipSobe(odabraniTip.tip_sobe_id, naziv, opis);
        setOdabraniTip(null);
      } else {
        await createTipSobe(naziv, opis);
      }

      await ucitajTipoveSoba();
    } catch (error: any) {
      setGreska(error.response?.data?.message || "Greška kod spremanja.");
    }
  };

  const handleObrisi = async (id: number) => {
    try {
      setGreska("");
      await deleteTipSobe(id);
      await ucitajTipoveSoba();
    } catch (error: any) {
      setGreska(
        error.response?.data?.message ||
          "Tip sobe se ne može obrisati jer se koristi u sobama."
      );
    }
  };




const handleSpremiTipOdjela = async (naziv: string, opis: string) => {
  try {
    setGreska("");

    if (odabraniTipOdjela) {
      await updateTipOdjela(
        odabraniTipOdjela.tip_odjela_id,
        naziv,
        opis
      );
      setOdabraniTipOdjela(null);
    } else {
      await createTipOdjela(naziv, opis);
    }

    await ucitajTipoveOdjela();
  } catch (error: any) {
    setGreska(
      error.response?.data?.message || "Greška kod spremanja tipa odjela."
    );
  }
};

  const handleObrisiTipOdjela = async (id: number) => {
    const potvrda = confirm("Jesi li sigurna da želiš obrisati tip odjela?");
    if (!potvrda) return;

    try {
      setGreska("");
      await deleteTipOdjela(id);
      await ucitajTipoveOdjela();
    } catch (error: any) {
      setGreska(
        error.response?.data?.message ||
          "Tip odjela se ne može obrisati jer se koristi u odjelima."
      );
    }
  };

 
  const filtriraniTipoviSoba = tipoviSoba.filter((tip) =>
    tip.naziv.toLowerCase().includes(pretraga.toLowerCase())
  );

  const filtriraniTipoviOdjela = tipoviOdjela.filter((tip) =>
  tip.naziv.toLowerCase().includes(pretragaTipovaOdjela.toLowerCase())
);
  return (
    <div>
      <h1>Šifrarnici</h1>

      {greska && <p style={{ color: "red" }}>{greska}</p>}



      <section>
        <h2>Šifrarnik tipova odjela</h2>

        <div>
  <label>Pretraži po nazivu:</label>
  <br />
  <input
    type="text"
    value={pretragaTipovaOdjela}
    onChange={(e) => setPretragaTipovaOdjela(e.target.value)}
    placeholder="Unesi naziv tipa odjela..."
  />
</div>

<br />


        <br />

        
      <TipOdjelaForm
  odabraniTip={odabraniTipOdjela}
  onSubmit={handleSpremiTipOdjela}
  onCancelEdit={() => setOdabraniTipOdjela(null)}
/>

<br />

<TipOdjelaTable
  tipoviOdjela={filtriraniTipoviOdjela}
  onDelete={handleObrisiTipOdjela}
  onEdit={setOdabraniTipOdjela}
/>
      </section>

      <hr />

       <section>
        <h2>Šifrarnik tipova soba</h2>

        <div>
          <label>Pretraži po nazivu:</label>
          <br />
          <input
            type="text"
            value={pretraga}
            onChange={(e) => setPretraga(e.target.value)}
            placeholder="Unesi naziv tipa sobe..."
          />
        </div>

        <br />

        <TipSobeForm
          odabraniTip={odabraniTip}
          onSubmit={handleSubmit}
          onCancelEdit={() => setOdabraniTip(null)}
        />

        <br />

        <TipSobeTable
          tipoviSoba={filtriraniTipoviSoba}
          onDelete={handleObrisi}
          onEdit={setOdabraniTip}
        />
      </section>

      
    </div>
  );
};

export default TipoviSobaPage;