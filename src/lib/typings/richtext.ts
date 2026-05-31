// src/lib/types/richtext.ts
export type RichTextTextNode = {
    type: 'text';
    text: string;
};

export type RichTextHardBreakNode = {
    type: 'hard_break';
};

export type RichTextParagraphNode = {
    type: 'paragraph';
    content?: Array<RichTextTextNode | RichTextHardBreakNode>;
};

export type RichTextNode =
    | RichTextTextNode
    | RichTextHardBreakNode
    | RichTextParagraphNode;

export type RichTextDocument = {
    type: 'doc';
    content?: RichTextParagraphNode[];
};