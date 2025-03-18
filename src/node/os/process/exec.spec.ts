import { exec } from "./exec";

it("test", async () => {
  const ret = await exec("pwd");

  expect(ret).toBe(0);
} );

it("t2", async () => {
  const ret = await exec("sudo docker-compose");

  expect(ret).toBe(1);
} );
