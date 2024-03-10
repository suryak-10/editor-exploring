import { Extension } from "@tiptap/core";
import { Fragment, Slice } from "@tiptap/pm/model";
import {
  ReplaceAroundStep,
  ReplaceStep,
  Step,
  replaceStep,
} from "@tiptap/pm/transform";
import { Node } from "prosemirror-model";

const StepExtension = Extension.create({
  onTransaction({ transaction }) {
    if (!transaction.steps.length) return;
    // const stpe = new ReplaceStep();

    const {
      state: { tr },
      view: { dispatch },
    } = this.editor;

    const firstStpe = transaction.steps[0];
    console.log(firstStpe);

    console.log(tr.getMeta('InserByMe'));
    
    if (firstStpe instanceof ReplaceStep && !tr.getMeta('InserByMe')) {
      const node: Node = this.editor.schema.nodes.paragraph.create();
      // node.content = firstStpe.slice.content;
      console.log(node);
      const content = Fragment.from(node);
      const step = new ReplaceStep(
        this.editor.state.doc.content.size,
        this.editor.state.doc.content.size,
        new Slice(content, 0, 0)
      );
      tr.setMeta('InserByMe', true);
      tr.step(step);
      dispatch(tr);
      console.log(step);
    }else{
        console.log('Escaped.');
        
    }
  },
});

export default StepExtension;
