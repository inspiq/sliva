import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
`;

interface Option {
  value: string;
  label: string;
}

interface Props {
  onChange: Dispatch<SetStateAction<Option>>;
  options: Option[];
  value: Option;
  defaultValue?: Option;
  isSearchable?: boolean;
}

const UiSelectElement = (props: Props): ReactElement => {
  const {
    value,
    onChange,
    options,
    defaultValue,
    isSearchable = false,
  } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted && (
        <StyledSelect
          value={value}
          onChange={onChange as () => Option}
          options={options}
          defaultValue={defaultValue}
          isSearchable={isSearchable}
        />
      )}
    </>
  );
};

export const UiSelect = UiSelectElement;
