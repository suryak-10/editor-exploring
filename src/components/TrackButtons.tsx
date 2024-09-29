import { Button } from "@mui/material";
import { useRichTextEditorContext } from "mui-tiptap";
import { DELETE_CONTENT_MARK_TYPE_NAME, INSERT_CONTENT_MARK_TYPE_NAME, TRACK_MARK_CHANGES_MARK_NAME } from "../extensions/trakc-changes/track-changes";

export default function TrackButtons() {
    const editor = useRichTextEditorContext();

    const addMarkHandler = (type: string) => () => {
        if (!editor) return;
        const tr = editor.state.tr;
        const { from, to } = editor.state.selection;
        const mark = editor.schema.marks[TRACK_MARK_CHANGES_MARK_NAME].create({ type });
        tr.addMark(from, to, mark);
        editor.view.dispatch(tr);
    }

    return <div>
        <Button size="small" onClick={addMarkHandler(INSERT_CONTENT_MARK_TYPE_NAME)}>Insert</Button>
        <Button size="small" onClick={addMarkHandler(DELETE_CONTENT_MARK_TYPE_NAME)}>Delete</Button>
    </div>
}