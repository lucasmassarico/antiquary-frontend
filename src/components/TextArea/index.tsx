import { ComponentProps } from "react";
import { styled } from "@/styles";

export const TextArea = styled('textarea', {
    backgroundColor: '$gray100',
    padding: '$3 $4',
    borderRadius: '$md',
    boxSizing: 'border-box',
    border: '2px solid $gray100',

    fontFamily: '$default',
    fontSize: '$md',
    color: '$gray800',
    fontWeight: '$regular',
    resize: 'vertical',
    minHeight: 80,

    display: 'flex',
    alignItems: 'baseline',

    '&:focus': {
        outline: 0,
        borderColor: '$black'
    },

    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',

    },

    '&:placeholder': {
        color: '$gray400'
    }
})

export interface TextAreaProps extends ComponentProps<typeof TextArea> {}

TextArea.displayName = 'TextArea'
    