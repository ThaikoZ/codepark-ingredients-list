import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 150 }: Props) => {
  const [isExpanded, setExpanded] = useState(false);

  const clickHandle = () => {
    setExpanded(!isExpanded);
  };
  return (
    <p>
      {isExpanded ? children : children.substring(0, maxChars) + "..."}
      <button onClick={clickHandle}>{isExpanded ? "Less" : "More"}</button>
    </p>
  );
};

export default ExpandableText;
