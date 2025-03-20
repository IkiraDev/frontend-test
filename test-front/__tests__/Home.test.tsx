import Home from "@/app/page";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(async () => render(await Home()));

describe("Validate Fetching and Displays Binance Synbols", () => {
  it("shold have at least BTCUSDT/ETHUSDT/LTCBTC symbols", async () => {
    await waitFor(() => {
      expect(screen.getByText("BTCUSDT")).toBeInTheDocument();
      expect(screen.getByText("ETHUSDT")).toBeInTheDocument();
      expect(screen.getByText("LTCBTC")).toBeInTheDocument();
    });
  });
});

describe("Validate static inputs", () => {
  it("should have all lists.", async () => {
    await waitFor(() => {
      expect(screen.getByText("Crypto List")).toBeInTheDocument();
      expect(screen.getByText("New List")).toBeInTheDocument();
      expect(screen.getByText("Real Time Trade List")).toBeInTheDocument();
    });
  });

  it("should have all no data messages.", async () => {
    await waitFor(() => {
      expect(screen.getByText("No crypto list found.")).toBeInTheDocument();
      expect(
        screen.getByText(
          "No data found. Please select one of your lists or create and select a new list to view real time data."
        )
      ).toBeInTheDocument();
    });
  });

  it("should have add new list item button", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("new");
    });
  });
});

describe("Home Integration Add List Test", () => {
  it("should fetch and click on button to open a new list dialog", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button", { name: "new" });
      expect(button).toBeInTheDocument();
    });

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("New List")).toBeInTheDocument();
  });
});
