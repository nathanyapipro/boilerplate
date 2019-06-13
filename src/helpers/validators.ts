import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

interface ValidateFunction<T> extends Ajv.ValidateFunction {
  _t?: T;
}

function makeValidator<T>(schema: object): ValidateFunction<T> {
  return ajv.compile(schema);
}

export class ValidatorException<T> {
  message: string;
  validatorErrors: ValidateFunction<T>["errors"];

  constructor(validatorErrors: ValidateFunction<T>["errors"]) {
    this.message = "Validation Exception";
    this.validatorErrors = validatorErrors;
  }
}

export function validateBySchema<T>(schema: object, data: T) {
  const validator = makeValidator(schema);
  const valid = validator(data);

  if (!valid && validator.errors) {
    throw new ValidatorException(validator.errors);
  }
}
