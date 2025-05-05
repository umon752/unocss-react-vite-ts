import { useSelect } from 'downshift';
import { useController } from 'react-hook-form';

type Option = { label: string; value: string };

type SelectProps = {
  name: string;
  control?: any;
  options: Option[];
  placeholder?: string;
};
export const Select: React.FC<SelectProps> = ({
  name,
  control,
  options,
  placeholder = '請選擇',
}) => {
  const {
    field: { value, onChange },
  } = control ? useController({ 
    name, 
    control,
  }) : { field: { value: '', onChange: () => {} } };

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useSelect({
    items: options,
    defaultSelectedItem: options.find((opt) => opt.value === value),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem.value);
    },
    itemToString: (item) => item?.label || '',
  });

  return (
    <div className="relative inline-block w-100%">
      <button
        type="button"
        className="w-100% u-text flex flex-(items-center justify-between) gap-8 border-(solid 1 gray) rounded-4 cursor-pointer py-8 px-10"
        {...getToggleButtonProps()}
      >
        {selectedItem?.label || placeholder}
        <span className={`i-material-symbols:keyboard-arrow-down-rounded flex-(shrink-0) u-transition-ease ${isOpen ? 'rotate-180' : ''}`}></span>
      </button>

      <ul
        {...getMenuProps()}
        className={`absolute z-10 w-100% bg-blue-50 border border-gray-300 rounded-4 border-(solid 1 gray) shadow mt-4 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              key={item.value}
              {...getItemProps({ item, index })}
              className={`p-10 cursor-pointer ${
                highlightedIndex === index ? 'bg-blue-100' : ''
              }`}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
