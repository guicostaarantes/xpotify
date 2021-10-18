import { render } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";

import TokenWatcher from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-redux");
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("TokenWatcher component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to /token", () => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb({
        user: {
          token: "",
          fetchUserStatus: "idle",
        },
      }),
    );

    render(<TokenWatcher />);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith("/token");
  });
});
