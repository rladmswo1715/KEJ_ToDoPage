import { useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import useClickOutside from "@/hooks/useClickOutside";
import KebabItem from "./KebabItem";

interface KebabProps {
  itemOptions: {
    key: string;
    clickEvent: React.MouseEventHandler<HTMLLIElement>;
  }[];
}

const Kebab = ({ itemOptions }: KebabProps) => {
  const [isVisible, setVisible] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);

  const handleKebabButtonClick = () => setVisible((prev) => !prev);

  useClickOutside(kebabRef, () => setVisible(false));

  return (
    <div
      className="relative"
      ref={kebabRef}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button type="button" onClick={handleKebabButtonClick}>
        <IoIosMenu size={32} />
      </button>
      {isVisible && (
        <ul className="absolute right-0 border-2 border-var-primary-300 bg-gray-100 rounded-lg">
          {itemOptions.map((item) => {
            return <KebabItem key={item.key} itemOption={item} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Kebab;
