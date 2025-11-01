import { initializeTimes, updateTimes } from "./times";

describe("times API helpers", () => {
  afterEach(() => {
    // clean up any global mocks
    try {
      delete window.fetchAPI;
    } catch (e) {
      /* ignore */
    }
  });

  test("initializeTimes calls fetchAPI and returns its result", () => {
    window.fetchAPI = jest.fn(() => ["17:00", "18:00"]);
    const times = initializeTimes();
    expect(window.fetchAPI).toHaveBeenCalled();
    expect(times).toEqual(["17:00", "18:00"]);
  });

  test("updateTimes with unknown action returns same state", () => {
    const state = ["a", "b"];
    const result = updateTimes(state, { type: "unknown" });
    expect(result).toBe(state);
  });

  test("updateTimes with date action calls fetchAPI and returns its result", () => {
    window.fetchAPI = jest.fn((date) => ["19:00"]);
    const state = ["x"];
    const result = updateTimes(state, { type: "date", date: "2025-11-01" });
    expect(window.fetchAPI).toHaveBeenCalledWith("2025-11-01");
    expect(result).toEqual(["19:00"]);
  });
});
