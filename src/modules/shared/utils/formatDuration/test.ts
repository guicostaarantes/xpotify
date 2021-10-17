import formatDuration from "./index";

it("should return formatted durations for all test cases", () => {
  expect(formatDuration(9250)).toEqual("0:09");
  expect(formatDuration(184720)).toEqual("3:04");
  expect(formatDuration(785160)).toEqual("13:05");
  expect(formatDuration(7322560)).toEqual("2:02:02");
});
