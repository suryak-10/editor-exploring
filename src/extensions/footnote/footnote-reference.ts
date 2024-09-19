import { mergeAttributes, Node, Mark } from "@tiptap/core";
import { v4 as uuid } from "uuid";


const FOOTNOTE_REFERENCE_NAME = 'footnote-reference';
const REF_CLASS = "footnote-ref";
const REFNUM_ATTR = "data-reference-number";

export const FootnoteReference = Node.create({
    name: FOOTNOTE_REFERENCE_NAME,
    inline: true,
    content: "text*",
    group: "inline",
    atom: true,
    draggable: true,

    parseHTML() {
        return [
            {
                tag: `sup a.${REF_CLASS}`,
                priority: 1000,
            }
        ];
    },

    addAttributes() {
        return {
            class: {
                default: REF_CLASS,
            },
            "data-id": {
                parseHTML(element) {
                    return element.getAttribute("data-id") || uuid();
                },
                renderHTML(attributes) {
                    return {
                        "data-id": attributes["data-id"] || uuid(),
                    };
                },
            },
            referenceNumber: {
                parseHTML(element) {
                    return element.getAttribute(REFNUM_ATTR) || element.innerText;
                },
            },

            href: {
                renderHTML(attributes) {
                    return {
                        href: `#fn:${attributes["referenceNumber"]}`,
                    };
                },
            },
        };
    },


    renderHTML({ HTMLAttributes }) {
        const { referenceNumber, ...attributes } = HTMLAttributes;
        const attrs = mergeAttributes(this.options.HTMLAttributes, attributes);
        attrs[REFNUM_ATTR] = referenceNumber;

        const data = [
            "sup",
            { id: `fnref:${referenceNumber}` },
            ["a", attrs, HTMLAttributes.referenceNumber],
        ] as const;

        return data;
    },


    // renderHTML({ HTMLAttributes }) {
    //     const referenceNumber = 1;
    //     const attrs = {};
    //     return [
    //         "sup",
    //         { id: `fnref:${referenceNumber}` },
    //         ["a", attrs, HTMLAttributes.referenceNumber],
    //     ];
    // },

});