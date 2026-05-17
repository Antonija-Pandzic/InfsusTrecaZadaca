import { useEffect, useState } from "react";
import { TipOdjela } from "../types/tipOdjela";

type Props = {
  odabraniTip: TipOdjela | null;
  onSubmit: (naziv: string, opis: string) => void;
  onCancelEdit: () => void;
};

const TipOdjelaForm = ({ odabraniTip, onSubmit, onCancelEdit }: Props) => {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");

  useEffect(() => {
    if (odabraniTip) {
      setNaziv(odabraniTip.naziv);
      setOpis(odabraniTip.opis || "");
    }
  }, [odabraniTip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(naziv, opis);

    setNaziv("");
    setOpis("");
  };

  const handleCancel = () => {
    setNaziv("");
    setOpis("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Naziv tipa odjela:</label>
        <br />
        <input
          type="text"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Opis:</label>
        <br />
        <textarea value={opis} onChange={(e) => setOpis(e.target.value)} />
      </div>

      <br />

      <button type="submit">
        {odabraniTip ? "Spremi promjene" : "Dodaj tip odjela"}
      </button>

      {odabraniTip && (
        <button type="button" onClick={handleCancel}>
          Odustani
        </button>
      )}
    </form>
  );
};

export default TipOdjelaForm;