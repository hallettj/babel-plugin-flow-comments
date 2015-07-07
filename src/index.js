export default function ({ Plugin, types: t }) {
  return new Plugin("flow-comments", {
    visitor: {
      // support function a(b?) {}
      Identifier(node, parent, scope, file) {
        if (!node.optional || node.typeAnnotation) {
          return;
        }
        this.addComment("trailing", ":: ?");
      },
      "ExportNamedDeclaration|Flow"(node, parent, scope, file) {
        // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
        if (t.isExportNamedDeclaration(node) && !t.isFlow(node.declaration)) {
          return;
        }
        var comment = this.getSource().replace("*/","//");
        if (parent.optional) comment = "?" + comment;
        if (comment[0] !== ":") comment = ":: " + comment;
        this.addComment("trailing", comment);
        this.replaceWith(t.noop());
      }
    }
  });
}
