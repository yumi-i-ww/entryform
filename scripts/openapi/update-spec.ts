import * as fs from "node:fs";

import fetch from "node-fetch-commonjs";

const SPEC_URL =
  //envと同じにする
  "https://f04-contact.f02-nfc.teba-saki.net/dev/swagger?format=json";

async function main() {
  const specRes = await getSpec();
  const spec = await specRes.text();
  fs.writeFileSync(`${__dirname}/openapi.json`, spec, {
    encoding: "utf-8",
  });
  console.log("Update spec");
}

async function getSpec() {
  return await fetch(SPEC_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-api-key": "IDwp2q4wpY5jmDpaCQEGc4EvtecHP7u026zNkti6",
      // Authorization: `Basic ${authString}`,
    },
  });
}
main().catch((err) => {
  console.error(err);
});
