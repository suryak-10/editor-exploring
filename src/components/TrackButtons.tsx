import { Button } from "@mui/material";
import { useRichTextEditorContext } from "mui-tiptap";
import { DELETE_MARK_NAME, INSERT_MARK_NAME, TRACK_MARK_NAME } from "../extensions/TrackChanges";

export default function TrackButtons() {
    const editor = useRichTextEditorContext();

    const addMarkHandler = (type: string) => () => {
        if (!editor) return;
        const tr = editor.state.tr;
        const { from, to } = editor.state.selection;
        const mark = editor.schema.marks[TRACK_MARK_NAME].create({ type });
        tr.addMark(from, to, mark);
        editor.view.dispatch(tr);
    }

    return <div>
        <Button size="small" onClick={addMarkHandler(INSERT_MARK_NAME)}>Insert</Button>
        <Button size="small" onClick={addMarkHandler(DELETE_MARK_NAME)}>Delete</Button>
    </div>
}