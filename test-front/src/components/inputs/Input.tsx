import styled from "styled-components";
import { ChangeEvent, Ref, useState } from "react";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props?.theme?.colors?.white};
  border-radius: 8px;
  padding: 8px 10px;
  width: 100%;
  transition: 0.3s;
  &:focus-within {
    box-shadow: -1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const InputComponent = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  width: 100%;
  padding: 8px;
  color: ${(props) => props?.theme?.colors?.typography};
`;

export const Input = ({ placeholder = "", onInput, ref, value }: InputProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onInput) onInput(e.target.value);
  };

  return (
    <InputContainer>
      <InputComponent
        type="text"
        ref={ref}
        placeholder={placeholder}
        value={value || query}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

interface InputProps {
  placeholder?: string;
  onInput?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
  value?: string;
}
