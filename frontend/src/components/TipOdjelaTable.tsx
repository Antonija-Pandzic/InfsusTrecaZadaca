import { TipOdjela } from "../types/tipOdjela";

type Props = {
  tipoviOdjela: TipOdjela[];
  onDelete: (id: number) => void;
  onEdit: (tip: TipOdjela) => void;
};

const TipOdjelaTable = ({ tipoviOdjela, onDelete, onEdit }: Props) => {
  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Naziv</th>
          <th>Opis</th>
          <th>Akcije</th>
        </tr>
      </thead>

      <tbody>
        {tipoviOdjela.map((tip) => (
          <tr key={tip.tip_odjela_id}>
            <td>{tip.tip_odjela_id}</td>
            <td>{tip.naziv}</td>
            <td>{tip.opis}</td>
            <td>
              <button onClick={() => onEdit(tip)}>Uredi</button>{" "}
              <button onClick={() => onDelete(tip.tip_odjela_id)}>
                Obriši
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TipOdjelaTable;