import React, { useEffect, useRef } from 'react';
import { Pencil as IconPencil, Check } from 'lucide-react';
import styles from './color-picker.module.scss';

type ColorPickerType = {
  label?: string;
  currentColor?: string;
  handleColorChange: (color: string) => void;
  disabled?: boolean;
};

const ColorPicker: React.FC<ColorPickerType> = props => {
  const { label, currentColor = '#0f2a6f', handleColorChange } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string>(currentColor);
  const [isEditMode, setIsEditMode] = React.useState(false);

  useEffect(() => {
    setSelectedColor(currentColor);
  }, [currentColor]);

  const handleChange = (color: string) => {
    setSelectedColor(color);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    setTimeout(() => {
      if (!isEditMode) {
        inputRef?.current?.click();
      }
    }, 200);
  };

  const handleSave = () => {
    toggleEditMode();
    handleColorChange(selectedColor);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label_container}>{label}</label>
      <input
        type="color"
        id={label}
        ref={inputRef}
        value={selectedColor}
        onChange={e => handleChange(e.target.value)}
        className={styles.container}
        disabled={!isEditMode || props.disabled}
      />
      {selectedColor && (
        <div className={styles.selection}>
          <p>{selectedColor}</p>
          <span>
            {isEditMode || props.disabled ? (
              <Check color="#216AF7" size={18} onClick={handleSave} />
            ) : (
              <IconPencil color="#216AF7" size={18} onClick={toggleEditMode} />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

ColorPicker.defaultProps = {
  label: 'Color',
  currentColor: '#0f2a6f',
};

export default ColorPicker;
