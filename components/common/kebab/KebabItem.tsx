interface KebabItemProps {
  itemOption: {
    key: string;
    clickEvent: React.MouseEventHandler<HTMLLIElement>;
  };
}
const KebabItem = ({ itemOption }: KebabItemProps) => {
  return (
    <li
      className="min-w-[8rem] py-3 text-center text-base transition-all duration-200 hover:cursor-pointer hover:text-var-primary-500"
      onClick={itemOption.clickEvent}
    >
      {itemOption.key}
    </li>
  );
};

export default KebabItem;
