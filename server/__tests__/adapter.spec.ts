import { adapter } from "../src/service";

describe("Adapter", () => {
  it("should be adapt to contact with last name", () => {
    expect(adapter(["Ada Lovelace", "ada@resend.com"], "1234")).toMatchObject({
      requestId: "1234",
      email: "ada@resend.com",
      firstName: "Ada",
      lastName: "Lovelace",
    });
  });

  it("should be adapt to contact without last name", () => {
    expect(adapter(["Ada", "ada@resend.com"], "1234")).toMatchObject({
      requestId: "1234",
      email: "ada@resend.com",
      firstName: "Ada",
      lastName: undefined,
    });
  });
});
