import s from "./Input.module.css";
import { InputProps } from "./Input.d";

const Input: React.FC<InputProps> = ({
  value,
  max = 100,
  min = 0,
  isWholeNumber,
  updateValue,
  type,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(event.target.value));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Return") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className={s.container}>
      <div className={`${s.inputContainer} flex gap-x-[1em] px-[1em]`}>
        <div className={s.sliderContainer}>
          <div className={s.sliderTrack}>
            <div
              className={`${s.sliderTrackFill}`}
              style={{
                width: `${(((value ?? 0) - min) / (max - min)) * 100}%`,
                background: `rgb(var(--${type}__background-rgb))`,
              }}
            ></div>
          </div>
          <input
            type="range"
            className={s.numberInput}
            value={value || 0}
            min={min ? min : 0}
            max={max ? max : 2}
            step={isWholeNumber ? 1 : 0.1}
            onChange={handleChange}
          />
        </div>
        <input
          type="number"
          value={value || 0}
          onChange={handleChange}
          className={s.numberInputLabel}
          onFocus={handleFocus}
          max={max ? max : 2}
          step={isWholeNumber ? 1 : 0.1}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Input;
