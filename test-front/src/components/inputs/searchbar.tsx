import styled from "styled-components";
import { Search } from "lucide-react";
import { ChangeEvent, Ref, useState } from "react";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props?.theme?.colors?.white};
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  transition: 0.3s;
  &:focus-within {
    box-shadow: -1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  width: 100%;
  padding: 8px;
  color: ${(props) => props?.theme?.colors?.typography};
`;

const SearchIcon = styled(Search)`
  color: #888;
  margin-right: 8px;
`;

export const SearchBar = ({ placeholder = "Pesquisar...", onSearch, ref }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchIcon size={20} />
      <SearchInput
        type="text"
        ref={ref}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
}
