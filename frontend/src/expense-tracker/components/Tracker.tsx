import { useRef } from "react";

interface Props {
  onSelectCategory: (category: string) => void;
}

const Tracker = ({ onSelectCategory }: Props) => {
  const category = useRef<HTMLSelectElement>(null);
  const handleChange = () => {
    console.log(category.current?.value);
  };

  return (
    <div className="mb-3">
      <select
        id="category"
        ref={category}
        className="form-select"
        aria-label="Default select example"
        onChange={(event) => onSelectCategory(event.target.value)}
        defaultValue=""
      >
        <option value="">All categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </div>
  );
};

export default Tracker;
