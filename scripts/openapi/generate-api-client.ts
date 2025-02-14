import * as fs from "fs";
import { CodeGenerator } from "@himenon/openapi-typescript-code-generator";
import * as Templates from "@himenon/openapi-typescript-code-generator/dist/templates";

const main = () => {
  const codeGenerator = new CodeGenerator(`${__dirname}/openapi.json`);

  const apiClientGeneratorTemplate = {
    generator: Templates.ClassApiClient.generator,
    option: {},
  };

  const typeDefCode = codeGenerator.generateTypeDefinition();
  const apiClientCode = codeGenerator.generateCode([
    {
      generator: () => {
        return ['import { Schemas } from "./types";'];
      },
    },
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    apiClientGeneratorTemplate,
  ]);

  fs.writeFileSync(__dirname + "/../../src/api/types.ts", typeDefCode, {
    encoding: "utf-8",
  });
  fs.writeFileSync(__dirname + "/../../src/api/apiClient.ts", apiClientCode, {
    encoding: "utf-8",
  });

  // eslint-disable-next-line no-console
  console.log("Generate API Client");
};

main();
