import { ValueType } from "../components/Autocomplete";

export const valueTypeToValue = <T>(valueType: ValueType): Array<T> | T => {
  if (valueType instanceof Array) {
    return valueType.map(v => v.value);
  }

  return valueType && valueType.value;
};
