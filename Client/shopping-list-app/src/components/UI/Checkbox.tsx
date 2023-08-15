"use client";

interface Props {
  isChecked : boolean;
  onClickFunction : () => void
}

export function Checkbox({ isChecked, onClickFunction }: Props) {

  return (
    <div className="checkbox-wrapper">
      <input type="checkbox" checked={isChecked} onChange={onClickFunction} />
      <svg viewBox="0 0 35.6 35.6">
        <circle r="17.8" cy="17.8" cx="17.8" className="background"></circle>
        <circle r="14.37" cy="17.8" cx="17.8" className="stroke"></circle>
        <polyline
          points="11.78 18.12 15.55 22.23 25.17 12.87"
          className="check"
        ></polyline>
      </svg>
    </div>
  );
}
