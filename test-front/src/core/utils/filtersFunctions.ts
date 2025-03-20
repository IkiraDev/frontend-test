import { Pagination } from "../types/data";

export function filterData<T>(
  { page = 0, search = "", size = 10 }: Pagination,
  data: T[],
  filterKeys: (keyof T)[]
) {
  const ListData = search.length
    ? data.filter((i) =>
        filterKeys.find((key) => (i[key] as string).toLowerCase().includes(search.toLowerCase()))
      )
    : data;
  return ListData.filter((_, i) => i >= page * size && i < page * size + size);
}
