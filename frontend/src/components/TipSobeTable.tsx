import { TipSobe } from "../types/TipSobe";

type Props = {
  tipoviSoba: TipSobe[];
  onDelete: (id: number) => void;
  onEdit: (tip: TipSobe) => void;
};

const TipSobeTable = ({ tipoviSoba, onDelete, onEdit }: Props) => {
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
        {tipoviSoba.map((tip) => (
          <tr key={tip.tip_sobe_id}>
            <td>{tip.tip_sobe_id}</td>
            <td>{tip.naziv}</td>
            <td>{tip.opis}</td>
            <td>
              <button onClick={() => onEdit(tip)}>Uredi</button>{" "}
              <button onClick={() => onDelete(tip.tip_sobe_id)}>
                Obriši
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TipSobeTable;