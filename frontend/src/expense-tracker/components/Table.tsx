interface Item {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  itemList: Item[];
  onDelete: (id: number) => void;
}

const Table = ({ itemList, onDelete }: Props) => {
  if (itemList.length === 0) return null;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Desciption</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {itemList.map((item) => (
          <tr key={item.id}>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.category}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            ${itemList.reduce((acc, item) => item.amount + acc, 0).toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
