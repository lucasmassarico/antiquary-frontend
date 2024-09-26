import React from "react";
import { Descendant } from "slate";
import { Typography } from "@mui/material";

interface SlateContentRendererProps {
    content: Descendant[];
}

const SlateContentRenderer: React.FC<SlateContentRendererProps> = ({
    content,
}) => {
    const renderNode = (node: any, index: number) => {
        const { type, children } = node;

        switch (type) {
            case "paragraph":
                return (
                    <Typography variant="body1" paragraph key={index}>
                        {children.map(renderText)}
                    </Typography>
                );
            case "heading-one":
                return (
                    <Typography variant="h4" gutterBottom key={index}>
                        {children.map(renderText)}
                    </Typography>
                );
            case "heading-two":
                return (
                    <Typography variant="h5" gutterBottom key={index}>
                        {children.map(renderText)}
                    </Typography>
                );
            // Add cases for other node types as needed
            default:
                return (
                    <Typography variant="body1" paragraph key={index}>
                        {children.map(renderText)}
                    </Typography>
                );
        }
    };

    const renderText = (leaf: any, index: number) => {
        let text = leaf.text;

        if (leaf.bold) {
            text = <strong key={index}>{text}</strong>;
        }

        if (leaf.italic) {
            text = <em key={index}>{text}</em>;
        }

        if (leaf.underline) {
            text = (
                <span style={{ textDecoration: "underline" }} key={index}>
                    {text}
                </span>
            );
        }

        // Handle other formatting options...

        return <React.Fragment key={index}>{text}</React.Fragment>;
    };

    return <div>{content.map(renderNode)}</div>;
};

export default SlateContentRenderer;
