import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import Autocomplete, { OptionsType, AutocompleteProps, ValueType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { $deviceModelOptions } from "../../states/cache/selectors";

interface ReduxStateProps {
  options: OptionsType;
}

interface ReduxDispatchProps {}

export type DeviceModelAutocompleteValue = number | number[] | undefined;

interface OwnProps
  extends Omit<AutocompleteProps, "onInputChange" | "onChange" | "value"> {
  value?: DeviceModelAutocompleteValue;
  onChange: (value: DeviceModelAutocompleteValue) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function DeviceModelAutocompleteBase(props: Props) {
  const { updateSubmissionAssignee, options, value, onChange, ...rest } = props;

  const handleChange = (valueType: ValueType) => {
    onChange(autocompleteHelper.valueTypeToValue(valueType));
  };

  const [selectedOptions, setSelectedOptions] = React.useState<ValueType>([]);

  React.useEffect(() => {
    const allValues: Array<number> = value
      ? value instanceof Array
        ? value
        : [value]
      : [];

    const selectedOptions = options.filter(o =>
      allValues.some(v => v === o.value)
    );
    setSelectedOptions(selectedOptions);
  }, [options, value]);

  return (
    <Autocomplete
      {...rest}
      isMulti
      placeholder="Select Models ..."
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      isClearable={true}
    />
  );
}

const mapStateToProps = (state: StoreState, _: OwnProps): ReduxStateProps => {
  return {
    options: $deviceModelOptions(state)
  };
};

const DeviceModelAutocomplete = connect(
  mapStateToProps,
  {}
)(DeviceModelAutocompleteBase);

export default DeviceModelAutocomplete;
