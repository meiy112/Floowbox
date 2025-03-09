import { useState } from "react";

const HeaderNode = () => {
  const [text, setText] = useState("Double-click to edit");
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="text-[1.8rem]" style={{ fontWeight: 800 }}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="outline-none"
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{text}</span>
      )}
    </div>
  );
};

export default HeaderNode;
