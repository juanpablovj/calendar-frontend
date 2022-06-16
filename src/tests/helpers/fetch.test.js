import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en el helper fetch", () => {
  let token;
  test("fetchSinToken debe funcionar", async () => {
    const resp = await fetchSinToken(
      "auth",
      {
        email: "jp@jp1.com",
        password: "123123",
      },
      "POST"
    );

    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("fetchConToken debe funcionar", async () => {
    localStorage.setItem('token', token);

    const resp = await fetchConToken('events/6263387380dffef0ddde8630', {}, 'DELETE');
    const body = await resp.json();
    
    expect(body.msg).toBe('Ese id del evento no existe')
  });
});
