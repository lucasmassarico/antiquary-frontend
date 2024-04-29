import { ComponentProps, ElementRef, forwardRef, ReactNode } from "react";
import { TextInputContainer, Input } from "./styles";

export interface TextInputProps extends ComponentProps<typeof Input> {
    placeholder?: string;
    suffix?: ReactNode;
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
    (props: TextInputProps, ref) => {
        const { suffix, ...rest } = props;

        return (
            <TextInputContainer>
                <Input ref={ref} {...rest} />
                <div className="suffix">{suffix}</div>
            </TextInputContainer>
        );
    }
);

TextInput.displayName = "TextInput";
