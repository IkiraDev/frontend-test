"use client";
import { Box } from "@/components/structure/Box";

export const QueryError = ({ msg }: { msg: string }) => {
  return (
    <Box center="full" height={"100vh"}>
      {msg}
    </Box>
  );
};
