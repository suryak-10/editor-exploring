import { Mark } from "@tiptap/core";

export const TRACK_MARK_CHANGES_MARK_NAME = `track-mark`;
export const MARK_ADDED_CONTENT_MARK_TYPE_NAME = `added`;
export const MARK_REMOVED_CONTENT_MARK_TYPE_NAME = `removed`;

export const TrackMarkChangesMark = Mark.create({
    name: TRACK_MARK_CHANGES_MARK_NAME,
    parseHTML() {
        return [
            {
                tag: this.name
            },
        ]
    },
    addAttributes() {
        return {
            type: {
                default: MARK_ADDED_CONTENT_MARK_TYPE_NAME,
            },
            marks: {
                default: '',
            }
        };
    },
    renderHTML(props) {
        return [this.name, props.HTMLAttributes, 0];
    },
});