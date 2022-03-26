import React from 'react';

interface Props {
  value?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  id?: string;
}
const UploadController: React.FC<Props> = ({
  disabled = false,
  onChange,
  accept = 'image/*',
  multiple = false,
  id = 'upload-controller',
  children,
}) => {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="file"
        accept={accept}
        hidden
        onChange={onChange}
        multiple={multiple}
        disabled={disabled}
      />
      {children}
    </label>
  );
};

export default UploadController;
