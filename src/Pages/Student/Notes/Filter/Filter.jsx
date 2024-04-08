import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./Filter.css";

export default function Filter({
  Icon,
  title,
  children,
  className,
  dropdownClassName,
}) {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="paste-buttonFilter" ref={dropdownRef}>
      <button
        className={`${className} ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <Icon />
        <div>{title}</div>
        <IoIosArrowDown />
      </button>
      {isActive && (
        <div className={`dropdown-contentFilter ${dropdownClassName}`}>
          {typeof children === "function" ? children() : children}
        </div>
      )}
    </div>
  );
}
