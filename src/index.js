export default function ({ Plugin, types: t }) {
  function wrapInFlowComment(context, parent) {
    context.addComment("trailing", generateComment(context, parent));
    context.replaceWith(t.noop());
  }

  function generateComment(context, parent) {
    var comment = context.getSource().replace(/\*-\//g, "*-ESCAPED/").replace(/\*\//g, "*-/");
    if (parent && parent.optional) comment = "?" + comment;
    if (comment[0] !== ":") comment = ":: " + comment;
    return comment;
  }

  return new Plugin("flow-comments", {
    visitor: {
      TypeCastExpression(node) {
        this.get("expression").addComment("trailing", generateComment(this.get("typeAnnotation")));
        this.replaceWith(t.parenthesizedExpression(node.expression));
      },

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
