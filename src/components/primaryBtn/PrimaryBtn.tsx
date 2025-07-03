import * as React from "react";
import "./PrimaryBtn.scss";
interface PrimaryBtnProps {
  children: React.ReactNode;
  bgcolor: string;
  onClick?: () => void;
  color: string;
}

const PrimaryBtn: React.FunctionComponent<PrimaryBtnProps> = ({
  children,
  bgcolor,
  color,
  onClick,
}) => {
  return (
    <>
      <button
        className="primary-btn"
        onClick={onClick}
        style={bgcolor ? { backgroundColor: bgcolor, color: color } : {}}
      >
        {children}
      </button>
    </>
  );
};

export default PrimaryBtn;
