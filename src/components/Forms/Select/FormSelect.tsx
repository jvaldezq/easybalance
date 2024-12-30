// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';

import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { CombinedInputProps } from '../types';

export interface FormInputProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'> {
  options: {
    label: string;
    items: {
      id: string;
      name: string;
    }[];
  }[];
}

export const FormSelect = forwardRef(
  (props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      labelClassName,
      labelPosition,
      loading,
      name,
      placeholder,
      input,
      meta,
      wrapperClassName,
      childrenClassName,
      hidden = false,
      options,
      ...rest
    } = props;
    const { onChange, value, ...inputRest } = input;

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
        <Select
          onValueChange={onChange}
          defaultValue={value}
          {...inputRest}
          {...rest}
          ref={ref}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent side="top">
            {options?.map((group, groupIndex) => (
              <SelectGroup key={`group-${groupIndex}`}>
                <SelectLabel>{group.label}</SelectLabel>
                {group?.items.map((item, itemIndex) => (
                  <SelectItem
                    key={`item-${groupIndex}-${itemIndex}`}
                    value={item.id}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
            {/*<SelectGroup>*/}
            {/*    <SelectLabel>North America</SelectLabel>*/}
            {/*    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>*/}
            {/*    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>*/}
            {/*    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>*/}
            {/*    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>*/}
            {/*    <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>*/}
            {/*    <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>*/}
            {/*</SelectGroup>*/}
            {/*<SelectGroup>*/}
            {/*    <SelectLabel>Europe & Africa</SelectLabel>*/}
            {/*    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>*/}
            {/*    <SelectItem value="cet">Central European Time (CET)</SelectItem>*/}
            {/*    <SelectItem value="eet">Eastern European Time (EET)</SelectItem>*/}
            {/*    <SelectItem value="west">*/}
            {/*        Western European Summer Time (WEST)*/}
            {/*    </SelectItem>*/}
            {/*    <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>*/}
            {/*    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>*/}
            {/*</SelectGroup>*/}
            {/*<SelectGroup>*/}
            {/*    <SelectLabel>Asia</SelectLabel>*/}
            {/*    <SelectItem value="msk">Moscow Time (MSK)</SelectItem>*/}
            {/*    <SelectItem value="ist">India Standard Time (IST)</SelectItem>*/}
            {/*    <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>*/}
            {/*    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>*/}
            {/*    <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>*/}
            {/*    <SelectItem value="ist_indonesia">*/}
            {/*        Indonesia Central Standard Time (WITA)*/}
            {/*    </SelectItem>*/}
            {/*</SelectGroup>*/}
            {/*<SelectGroup>*/}
            {/*    <SelectLabel>Australia & Pacific</SelectLabel>*/}
            {/*    <SelectItem value="awst">*/}
            {/*        Australian Western Standard Time (AWST)*/}
            {/*    </SelectItem>*/}
            {/*    <SelectItem value="acst">*/}
            {/*        Australian Central Standard Time (ACST)*/}
            {/*    </SelectItem>*/}
            {/*    <SelectItem value="aest">*/}
            {/*        Australian Eastern Standard Time (AEST)*/}
            {/*    </SelectItem>*/}
            {/*    <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>*/}
            {/*    <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>*/}
            {/*</SelectGroup>*/}
            {/*<SelectGroup>*/}
            {/*    <SelectLabel>South America</SelectLabel>*/}
            {/*    <SelectItem value="art">Argentina Time (ART)</SelectItem>*/}
            {/*    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>*/}
            {/*    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>*/}
            {/*    <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>*/}
            {/*</SelectGroup>*/}
          </SelectContent>
        </Select>
      </InputWrapper>
    );
  },
);

FormSelect.displayName = 'FormSelect';
