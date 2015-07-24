export default function ({ Plugin, types: t }) {
  function wrapInFlowComment(context, parent) {
    var comment = context.getSource().replace(/\*-\//g, "*-ESCAPED/").replace(/\*\//g, "*-/");
    if (parent.optional) comment = "?" + comment;
    if (comment[0] !== ":") comment = ":: " + comment;
    context.addComment("trailing", comment);
    context.replaceWith(t.noop());
  }

  return new Plugin("flow-comments", {
    visitor: {
      // support function a(b?) {}
      Identifier(node, parent, scope, file) {
        if (!node.optional || node.typeAnnotation) {
          return;
        }
        this.addComment("trailing", ":: ?");
      },

      // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
      "ExportNamedDeclaration|Flow"(node, parent, scope, file) {
        if (t.isExportNamedDeclaration(node) && !t.isFlow(node.declaration)) {
          return;
        }
        wrapInFlowComment(this, parent);
      },

      // support `import type A` and `import typeof A` #10
      ImportDeclaration(node, parent, scope, file) {
        if (t.isImportDeclaration(node) && node.importKind !== "type" && node.importKind !== "typeof") {
          return;
        }
        wrapInFlowComment(this, parent);
      },
    }
  });
}
