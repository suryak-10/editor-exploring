import Paragraph from "@tiptap/extension-paragraph";
import { Fragment, Slice } from "@tiptap/pm/model";
import { ReplaceStep } from "@tiptap/pm/transform";
import { Editor } from "@tiptap/react";
import { Node } from "prosemirror-model";

export const insertText = ({ editor }: { editor: Editor }) => {
  const {
    state: { tr },
    view: { dispatch },
  } = editor;

  const node: Node = editor.schema.nodes.paragraph.create();
  node.content
  console.log(node);
  const content = Fragment.from(node);
  //   content
  //   content.te

  //   const slice = new Slice();

  //   const replaceStpe = new ReplaceStep(10, 100, );
};
