"use client";

import { Input } from "./input";
import React from "react";
import { Icon } from "../icon";
import { cn } from "@/lib/utils";

type NumberInputProps = {
  maxValue?: number;
  minValue?: number;
  defaultValue?: number | string;
  parser?: (val: string) => string;
  formatter?: (val: string) => string;
  onChange?: (val: string) => void;
};

const defaultParser = (val: string) => val.replace(/[^\d-]+/g, "");

const NumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  Omit<React.ComponentPropsWithoutRef<typeof Input>, "right" | "onChange"> &
    NumberInputProps
>(
  (
    {
      maxValue,
      minValue,
      defaultValue,
      parser,
      formatter,
      onChange,
      className,
      value,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState<string>(
      value?.toString() ?? ""
    );
    const [focused, setFocused] = React.useState(false);

    const max = maxValue ?? 100;
    const min = minValue ?? 0;

    const onValueChange = (value: string) => {
      setInputValue(value);
    };

    const incrementValue = () => {
      let newValue = +inputValue < max ? String(+inputValue + 1) : String(max);
      newValue = formatter?.(newValue) ?? newValue;
      setInputValue(newValue);
    };

    const decrementValue = () => {
      let newValue = +inputValue > min ? String(+inputValue - 1) : String(min);
      newValue = formatter?.(newValue) ?? newValue;
      setInputValue(newValue);
    };

    React.useEffect(() => {
      onChange?.(inputValue);
    }, [inputValue]);

    React.useEffect(() => {
      if (!focused && inputValue.length > 0) {
        let newVal = (parser ?? defaultParser)?.(inputValue);
        newVal = formatter?.(newVal) ?? newVal;
        setInputValue(newVal);
      }
    }, [focused, inputValue]);

    return (
      <>
        <Input
          ref={ref}
          icon={props.icon && <Icon icon='Lock' />}
          type={"number"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={inputValue}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn("number-input", className)}
          right={
            <div className='-mr-2 box-border h-10 w-8'>
              <div
                className='flex h-5 items-center justify-center  border-b border-l text-center hover:bg-light'
                onClick={() => incrementValue()}
              >
                <Icon icon='ChevronUp' />
              </div>
              <div
                className='flex h-5 items-center justify-center border-l text-center hover:bg-light'
                onClick={() => decrementValue()}
              >
                <Icon icon='ChevronDown' />
              </div>
            </div>
          }
          {...props}
        />
      </>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
