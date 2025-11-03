function LocaleSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value="ko">한국어</option>
      <option value="en">english</option>
    </select>
  );
}

export default LocaleSelect;
