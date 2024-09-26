import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Element as SlateElement } from "slate";
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
    useSlate,
} from "slate-react";
import { withHistory } from "slate-history";
import { Button, Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import isHotkey from "is-hotkey";
import { Editor, Transforms, Text } from "slate";
import { EditorContainer } from "./style";
import { CustomText, CustomElement } from "@/types";

const HOTKEYS: { [key: string]: string } = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface RichEditorProps {
    initialValue: Descendant[];
    setEditorValue: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

const RichTextEditor: React.FC<RichEditorProps> = ({
    initialValue,
    setEditorValue,
}) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [value, setValue] = useState<Descendant[]>(initialValue);

    const renderElement = useCallback(
        (props: RenderElementProps) => <Element {...props} />,
        []
    );
    const renderLeaf = useCallback(
        (props: RenderLeafProps) => <Leaf {...props} />,
        []
    );

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey] as keyof CustomText; // Fazendo o cast para 'keyof CustomText'
                toggleMark(editor, mark);
            }
        }
    };

    return (
        <div
            style={{
                border: "2px solid #ccc",
                borderRadius: "5px",
                padding: "2px",
            }}
        >
            <Slate
                editor={editor}
                initialValue={value}
                onChange={setEditorValue}
            >
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{
                        margin: "0",
                        padding: "0",
                        height: "25px",
                        minHeight: "25px",
                        borderBottom: "1px solid gray",
                    }}
                >
                    <MarkButton format="bold" icon={<FormatBoldIcon />} />
                    <MarkButton format="italic" icon={<FormatItalicIcon />} />
                    <MarkButton
                        format="underline"
                        icon={<FormatUnderlinedIcon />}
                    />
                    <BlockButton
                        format="heading-one"
                        icon={<FormatSizeIcon />}
                    />
                </Toolbar>
                <EditorContainer>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Digite os detalhes do produto..."
                        spellCheck
                        autoFocus
                        onKeyDown={onKeyDown}
                        className="editor"
                        style={{ outline: "none", minHeight: "150px" }}
                    />
                </EditorContainer>
            </Slate>
        </div>
    );
};

// Componente para renderizar blocos (títulos, parágrafos)
const Element = ({ attributes, children, element }: any) => {
    switch (element.type) {
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

// Componente para renderizar marcas (negrito, itálico, etc.)
const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
};

// Botão para alterar a marca (negrito, itálico, etc.)
const MarkButton = ({ format, icon }: any) => {
    const editor = useSlate();
    return (
        <IconButton
            size="small"
            color={isMarkActive(editor, format) ? "primary" : "default"}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon}
        </IconButton>
    );
};

// Botão para alterar blocos (títulos, parágrafos, etc.)
const BlockButton = ({ format, icon }: any) => {
    const editor = useSlate();
    return (
        <IconButton
            size="small"
            color={isBlockActive(editor, format) ? "primary" : "default"}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </IconButton>
    );
};

// Funções utilitárias para verificar e alternar marcas e blocos
const isMarkActive = (editor: Editor, format: keyof CustomText) => {
    const marks = Editor.marks(editor) as CustomText | null;
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: keyof CustomText) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            (n as CustomElement).type === format,
    });
    return !!match;
};

const toggleBlock = (editor: Editor, format: CustomElement["type"]) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(
                (!Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    (n as CustomElement).type) as string
            ),
        split: true,
    });

    let newProperties: Partial<CustomElement>;
    if (isActive) {
        newProperties = { type: "paragraph" };
    } else {
        newProperties = { type: isList ? "list-item" : format };
    }
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] } as CustomElement;
        Transforms.wrapNodes(editor, block);
    }
};

// Valor inicial do editor
const initialValue: Descendant[] = [
    {
        children: [{ text: "" }],
    },
];

export default RichTextEditor;
