import OrderedList from "@tiptap/extension-ordered-list";
import { FOOTNOTE_ITEM_NAME } from "./footnote-item";
import { FootnoteRules } from "./footnote-rules";


export const FOOTNOTE_LIST = {
    extensionName: "footnoteList",
    calssName: `footnote-list`,
} as const

export const FootnoteReferenceList = OrderedList.extend({
    name: FOOTNOTE_LIST.extensionName,
    group: '',
    isolating: true,
    defining: true,
    draggable: false,
    content: `${FOOTNOTE_ITEM_NAME}*`,

    addAttributes() {
        return {
            class: {
                default: FOOTNOTE_LIST.calssName,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: `ol .${FOOTNOTE_LIST.calssName}`,
                priority: 1000,
            }
        ];
    },

    addCommands() {
        return {};
    },

    addInputRules() {
        return [];
    },

    addExtensions() {
        return [FootnoteRules];
    },

});