import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import "./Like.css";

import { useState } from "react";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <a
      onClick={() => {
        onClick;
        setActive(!active);
      }}
      className="button__like"
    >
      {active ? <FcLike /> : <FcLikePlaceholder />}
    </a>
  );
};

export default Like;
