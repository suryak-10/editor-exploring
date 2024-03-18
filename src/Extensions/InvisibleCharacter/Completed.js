import { Extension as e } from "@tiptap/core";
import { PluginKey as t, Plugin as i, AllSelection as n } from "@tiptap/pm/state";
import { DecorationSet as s, Decoration as r } from "@tiptap/pm/view";

const invisibleCharactersPluginKey = new t("invisibleCharacters");

const createDecorations = (editorState, options) => {
  const pluginKey = invisibleCharactersPluginKey;
  const decorations = s.create(editorState.doc, []);

  const createDecorationsForRange = (from, to, doc, existingDecorations) =>
    options.builders
      .sort((builder1, builder2) =>
        builder1.priority > builder2.priority ? 1 : -1
      )
      .reduce(
        (decorations, builder) =>
          builder.createDecoration(from, to, doc, decorations),
        existingDecorations
      );

  return new i({
    key: pluginKey,
    state: {
      init: () => {
        const { $from: from, $to: to } = new n(editorState.doc);

        return options.injectCSS &&
          document &&
          ((css, nonce) => {
            const styleElement = document.querySelector(
              "style[data-tiptap-extension-invisible-characters-style]"
            );

            if (styleElement !== null) {
              return styleElement;
            }

            const style = document.createElement("style");
            nonce && style.setAttribute("nonce", nonce);
            style.setAttribute(
              "data-tiptap-extension-invisible-characters-style",
              ""
            );
            style.innerHTML = css;
            document.getElementsByTagName("head")[0].appendChild(style);
          })(".Tiptap-invisible-character {\n  height: 0;\n  padding: 0;\n  pointer-events: none;\n  user-select: none;\n  width: 0;\n}\n\n...rest of the CSS...",
              options.injectNonce
          );

        return {
          visible: options.visible,
          decorations: createDecorationsForRange(
            from.pos,
            to.pos,
            editorState,
            decorations.empty
          ),
        };
      },
      apply: (tr, pluginState, oldState, newState) => {
        const newVisible = tr.getMeta("setInvisibleCharactersVisible");
        const newStateWithVisibility = newVisible
          ? { ...pluginState, visible: newVisible }
          : pluginState;

        const newDecorations = tr.mapping.maps
          .flatMap((map, index) => {
            const [start, end] = map;

            return createDecorationsForRange(
              start + 1, // Adjusting for the mapping offset
              end,
              newState,
              newStateWithVisibility.decorations
            );
          });

        return {
          ...newStateWithVisibility,
          decorations: newDecorations,
        };
      },
    },
    props: {
      decorations(state) {
        const { visible, decorations } = this.getState(state);
        return visible ? decorations : decorations;
      },
    },
  });
};

const createInvisibleCharacterWidget = (type, key, content) =>
  r.widget(
    type,
    () => {
      const element = document.createElement("span");
      element.classList.add("Tiptap-invisible-character");
      element.classList.add(`Tiptap-invisible-character--${key}`);
      content && (element.textContent = content);
      return element;
    },
    {
      key: key,
      marks: [],
      side: 1000,
    }
  );

const positionToEnd = (node, pos) => pos + node.nodeSize - 1;

class InvisibleNode {
  constructor(options) {
    this.predicate = options.predicate;
    this.type = options.type;
    this.position = options.position || positionToEnd;
    this.content = options.content;
    this.priority = options.priority || 100;
  }

  createDecoration(from, to, doc, decorations) {
    let newDecorations = decorations;

    doc.nodesBetween(from, to, (node, pos) => {
      if (this.test(node)) {
        const position = this.position(node, pos);
        const existingDecoration = newDecorations.find(
          (decoration) => decoration.key === this.type
        );

        newDecorations = existingDecoration
          ? newDecorations.remove(existingDecoration).add(
              doc,
              [createInvisibleCharacterWidget(position, this.type, this.content)]
            )
          : newDecorations;
      }
    });

    return newDecorations;
  }

  test(node) {
    return this.predicate(node);
  }
}

class HardBreakNode extends InvisibleNode {
  constructor() {
    super({
      type: "break",
      predicate: (node) => node.type === node.type.schema.nodes.hardBreak,
    });
  }
}

class ParagraphNode extends InvisibleNode {
  constructor() {
    super({
      type: "paragraph",
      predicate: (node) => node.type === node.type.schema.nodes.paragraph,
    });
  }
}

class InvisibleCharacter {
  constructor(options) {
    this.predicate = options.predicate;
    this.type = options.type;
    this.content = options.content;
    this.priority = options.priority || 100;
  }

  createDecoration(from, to, doc, decorations) {
    const positionsAndTexts = (from, to, doc) => {
      const positionsAndTextsArray = [];

      doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
          const offset = Math.max(from, pos) - pos;
          positionsAndTextsArray.push({
            pos: pos + offset,
            text:
              node.text?.slice(offset, to - pos) ||
              "",
          });
        }
      });

      return positionsAndTextsArray;
    };

    const positionsAndTextsArray = positionsAndTexts(from, to, doc);

    return positionsAndTextsArray.reduce((newDecorations, { pos, text }) => {
      return text.split("").reduce((decorations, char, index) => {
        return this.test(char)
          ? decorations.add(
              doc,
              [createInvisibleCharacterWidget(pos + index, this.type, this.content)]
            )
          : decorations;
      }, newDecorations);
    }, decorations);
  }

  test(char) {
    return this.predicate(char);
  }
}

class SpaceCharacter extends InvisibleCharacter {
  constructor() {
    super({
      type: "space",
      predicate: (char) => char === " ",
    });
  }
}

const InvisibleCharacters = e.create({
  name: "invisibleCharacters",
  addOptions: () => ({
    visible: true,
    builders: [new SpaceCharacter(), new ParagraphNode(), new HardBreakNode()],
    injectCSS: true,
    injectNonce: undefined,
  }),
  addProseMirrorPlugins() {
    return [createDecorations(this.editor.state, this.options)];
  },
  addStorage() {
    return {
      visibility: () => this.options.visible,
    };
  },
  onBeforeCreate() {
    this.storage.visibility = () => {
      const pluginState = invisibleCharactersPluginKey.getState(
        this.editor.state
      );

      return pluginState?.visible;
    };
  },
  addCommands: () => ({
    showInvisibleCharacters: (visible = true) => ({ dispatch, tr }) => {
      dispatch && tr.setMeta("setInvisibleCharactersVisible", visible);
      return true;
    },
    hideInvisibleCharacters: () => ({ dispatch, tr }) => {
      dispatch && tr.setMeta("setInvisibleCharactersVisible", false);
      return true;
    },
    toggleInvisibleCharacters: () => ({ dispatch, tr, state }) => {
      const pluginState = invisibleCharactersPluginKey.getState(state);
      const newVisible = pluginState?.visible === false;
      dispatch && tr.setMeta("setInvisibleCharactersVisible", newVisible);
      return true;
    },
  }),
});

export {
  HardBreakNode,
  InvisibleCharacter,
  InvisibleCharacters,
  InvisibleNode,
  ParagraphNode,
  SpaceCharacter,
  InvisibleCharacters as default,
};
