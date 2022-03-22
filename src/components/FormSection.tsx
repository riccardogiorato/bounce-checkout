import { Separator } from "./Separator";

interface Props {
  title: string;
  status: "hidden" | "visible" | "completed";
  onChangeClick?: () => void;
}

export const FormSection: React.FC<Props> = ({
  title,
  status,
  children,
  onChangeClick,
}) => {
  if (status === "hidden") return <></>;

  return (
    <>
      {status === "visible" && (
        <div className="mx-6 my-8">
          <div className="font-medium text-xl">{title}</div>
          <div className="flex flex-column space-y-2">{children}</div>
        </div>
      )}
      {status === "completed" && (
        <div
          className="mx-6 mt-6 mb-6 bg-green-400 font-medium text-xl flex px-5 py-8 justify-between"
          onClick={onChangeClick}
        >
          <div className="">{title}</div>
          <div className="">change?</div>
        </div>
      )}
      <Separator />
    </>
  );
};
