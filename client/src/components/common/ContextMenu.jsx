import React, { useRef, useEffect } from "react";

function ContextMenu({ options, coordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id !=="context-opener") {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(false);
      }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setContextMenu]);

  return (
    <div
      className="bg-dropdown-background fixed py-2 z-[100] shadow-xl"
      style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
      ref={contextMenuRef}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li key={name} onClick={(e) => handleClick(e, callback)}
          className="px-5 py-2 cursor-pointer hover:bg-background-default-hover">
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;