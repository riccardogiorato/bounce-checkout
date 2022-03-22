interface Props {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <>
      <label className="text-base text-black mb-2">{label}</label>
      <input
        className="w-full p-3 rounded-md border-gray-300 border-1"
        type="text"
        placeholder=""
        value={value}
        onChange={(e) => {
          onChange(event?.target.value);
        }}
      />
    </>
  );
};
