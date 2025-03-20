import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Divider } from "../structure/Divider";
import { Box } from "../structure/Box";
import { laptop, mobile } from "@/core/theme/breakpoints";
import { Styles } from "styled-components/dist/types";
import { useDialog } from "@/contexts/DialogContext";

export default function SelectorList<T>({
  items,
  columns,
  maxh,
  maxw,
  radius,
  updateSelectedItems,
  allSelection = true,
  selectable = true,
  noDataMessage,
  onCellClick,
  selectedItems,
  mobile,
}: {
  columns: {
    key: string;
    title: string;
    view?: boolean;
    maxw?: string;
    render?: (data: string | number) => any;
  }[];
  items: {
    key: string;
    title: string;
    subtitle?: string;
    icon?: string;
    lastPrice?: string;
    bidPrice?: string;
    askPrice?: string;
    priceChange?: string;
  }[];
  mobile?: {
    td?: Styles<object>;
    tr?: Styles<object>;
    th?: Styles<object>;
    table?: Styles<object>;
  };
  maxh?: string | number;
  maxw?: string | number;
  radius?: string | number;
  updateSelectedItems?: (items: string[]) => void;
  allSelection?: boolean;
  selectable?: boolean;
  noDataMessage?: string;
  onCellClick?: (key: string, index: number) => void;
  selectedItems?: string[];
}) {
  const { defaultSelected } = useDialog();
  const [selected, setSelected] = useState<string[]>(defaultSelected || []);

  const handleSelect = (key: string, index: number) => {
    onCellClick?.(key, index);
    if (!selectable) return;
    setSelected((item) => {
      const newArr = Array.from(item);
      if (newArr.includes(key)) return newArr.filter((str) => str !== key);
      newArr.push(key);
      return newArr;
    });
  };

  const handleSelectAll = () => {
    if (!allSelection) return;
    if (selected.length > 0) return setSelected([]);
    setSelected(items.map((item) => item.key));
  };

  useEffect(() => {
    updateSelectedItems?.(selected);
  }, [selected]);

  return (
    <Table radius={radius} mobile={mobile?.table}>
      {(allSelection ||
        (!!columns.length && !!columns.filter((item) => item.view !== false).length)) && (
        <Th onClick={handleSelectAll} mobile={mobile?.th}>
          {allSelection && (
            <Td maxw={"30px"}>
              <input type="checkbox" readOnly checked={selected.length === items.length} />
            </Td>
          )}
          {columns.map((column, i) => {
            return (
              <Td key={column.key + i} maxw={column.maxw}>
                <p>{column.title}</p>
              </Td>
            );
          })}
        </Th>
      )}
      <TableContent maxh={maxh}>
        {!items.length && (
          <Box width={"100%"}>
            <p style={{ width: "100%", textAlign: "center", color: "#888" }}>
              {noDataMessage || "No data found."}
            </p>
          </Box>
        )}
        {items.map((item, i) => (
          <Box py={0} px={0} key={item.key + i} direction="column">
            <Tr
              selected={selectedItems?.includes(item.key)! || selected.includes(item.key)}
              onClick={() => handleSelect(item.key, i)}
              style={{ opacity: item.lastPrice !== "Waiting data..." ? 1 : 0.5 }}
              mobile={mobile?.tr}
            >
              {selectable && (
                <Td maxw={"30px"} mobile={mobile?.td}>
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item.key)! || selected.includes(item.key)}
                    readOnly
                  />
                </Td>
              )}
              {columns.map((column, columnIndex) => (
                <Td key={column.key + i + columnIndex} maxw={column.maxw} mobile={mobile?.td}>
                  {column.render?.(item[column.key as keyof typeof item] as string | number) || (
                    <p>{item[column.key as keyof typeof item]}</p>
                  )}
                </Td>
              ))}
            </Tr>
            <Divider />
          </Box>
        ))}
      </TableContent>
    </Table>
  );
}

const Table = styled.div<{ radius?: string | number; mobile?: Styles<object> }>`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: ${(props) => props.radius || "0px"};
  overflow: hidden;

  ${(props) =>
    props.mobile
      ? laptop(css`
          ${Object.keys(props.mobile)
            .map(
              (key) =>
                `${key as keyof Styles<object>}:${props?.mobile?.[key as keyof Styles<object>]}`
            )
            .join(";")}
        `)
      : ""}
`;

const TableContent = styled.div<{ maxh?: string | number }>`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  max-height: ${(props) => props.maxh || "unset"};
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Th = styled.div<{ mobile?: Styles<object> }>`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f1f1f1;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: left;

  /* gap: 1rem; */
  transition: background ease 0.6s, opacity ease 1s;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme?.colors?.secondary};
  }
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${(props) => props.theme?.colors?.secondary};
  }
  p {
    pointer-events: none;
  }
  ${(props) =>
    props.mobile
      ? laptop(css`
          ${Object.keys(props.mobile)
            .map(
              (key) =>
                `${key as keyof Styles<object>}:${props?.mobile?.[key as keyof Styles<object>]}`
            )
            .join(";")}
        `)
      : ""}
`;

const Tr = styled.div<{ selected: boolean; mobile?: Styles<object> | undefined }>`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  background-color: ${(props) =>
    props.selected ? props.theme?.colors?.secondary : props.theme?.colors?.white};
  cursor: pointer;
  transition: background ease 0.6s, opacity ease 1s;

  &:hover {
    opacity: 0.7;
    color: black;
    background-color: ${(props) =>
      props.selected ? props.theme?.colors?.white : props.theme?.colors?.secondary};
  }

  ${(props) =>
    props.mobile
      ? laptop(css`
          ${Object.keys(props.mobile)
            .map(
              (key) =>
                `${key as keyof Styles<object>}:${props?.mobile?.[key as keyof Styles<object>]}`
            )
            .join(";")}
        `)
      : ""}
`;

const Td = styled.div<{ maxw?: string | number; mobile?: Styles<object> | undefined }>`
  padding: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  max-width: ${(props) => props.maxw || "unset"};

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${(props) => props.theme?.colors?.secondary};
  }
  p {
    width: 100%;
    padding: 2px;
  }

  ${(props) =>
    props.mobile
      ? laptop(css`
          ${Object.keys(props.mobile)
            .map(
              (key) =>
                `${key as keyof Styles<object>}:${props?.mobile?.[key as keyof Styles<object>]}`
            )
            .join(";")}
        `)
      : ""}
`;
