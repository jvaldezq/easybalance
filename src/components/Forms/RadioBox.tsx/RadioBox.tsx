'use client';

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { CombinedInputProps } from '../types';

export interface FormInputProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLDivElement>, 'label' | 'name' | 'onChange'> {
  options: {
    name: string;
    id: string;
  }[];
}

export const FormRadioBox = forwardRef(
  (props: FormInputProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      label,
      labelClassName,
      labelPosition,
      loading,
      name,
      meta,
      wrapperClassName,
      childrenClassName,
      hidden = false,
      input,
      options,
      className,
      disabled,
    } = props;
    const { onChange, value } = input;

    const handleClick = useCallback(
      (option: string) => {
        onChange(option);
      },
      [onChange],
    );

    if (hidden) return null;

    return (
      <InputWrapper
        name={name}
        label={label}
        labelClassName={labelClassName}
        labelPosition={labelPosition}
        loading={loading}
        wrapperClassName={wrapperClassName}
        childrenClassName={childrenClassName}
        meta={meta}
      >
        <div
          className={cn(
            'flex',
            'gap-2',
            'flex-wrap',
            'justify-center',
            'items-center',
            'pt-1',
            className,
          )}
          ref={ref}
        >
          {options?.map((option) => {
            return (
              <Button
                variant={value === option.id ? 'default' : 'outline'}
                onClick={() => handleClick(option.id)}
                key={option.id}
                disabled={disabled}
              >
                {option.name}
              </Button>
            );
          })}
        </div>
      </InputWrapper>
    );
  },
);

FormRadioBox.displayName = 'FormRadioBox';
