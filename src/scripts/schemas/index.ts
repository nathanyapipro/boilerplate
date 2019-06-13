import * as path from "path";
import * as fs from "fs";
import * as TJS from "typescript-json-schema";

const SCHEMAS_PATH = `${__dirname}/../../schemas/Api`;
const CONFIG_PATH = `${__dirname}/../../../tsconfig.json`;

const settings: TJS.PartialArgs = {
	ref: false,
	required: true,
	strictNullChecks: true
};

const program = TJS.programFromConfig(CONFIG_PATH);
const generator = TJS.buildGenerator(program, settings);

if (!generator) {
	throw new Error("Could not create generator");
}

const API_SYMBOLS = generator
	.getUserSymbols()
	.filter(
		s =>
			s === "AuthStateCredentials" ||
			(s.startsWith("Api") && s.endsWith("Response"))
	);

API_SYMBOLS.forEach(apiSymbol => {
	const includeReffedDefinitions = true;

	const schema = generator.getSchemaForSymbol(
		apiSymbol,
		includeReffedDefinitions
	);

	const jsonSchema = JSON.stringify(schema);

	const typescriptFilePath = path.normalize(`${SCHEMAS_PATH}/${apiSymbol}.ts`);
	const typescriptFileContent = `export default ${jsonSchema}`;

	const jsonFilePath = path.normalize(`${SCHEMAS_PATH}/${apiSymbol}.json`);
	const jsonFileContent = jsonSchema;

	fs.writeFile(typescriptFilePath, typescriptFileContent, err => {
		if (err) {
			return console.log(err);
		}

		console.log(`Schema successfully generated for ${apiSymbol}.`);
	});

	fs.writeFile(jsonFilePath, jsonFileContent, err => {
		if (err) {
			return console.log(err);
		}

		console.log(`Schema successfully generated for ${apiSymbol}.`);
	});
});
