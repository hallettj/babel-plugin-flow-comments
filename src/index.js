export default function ({ Plugin, types: t }) {
  return new Plugin("flow-comments", {
    visitor: {
      Identifier(node, parent, scope, file) {
        if (!node.optional || node.typeAnnotation) {
          return;
        }
        this.addComment("trailing", ":: ?");
      },
      Flow(node, parent, scope, file) {
        var comment = this.getSource().replace("*/","//");
        if (parent.optional) comment = "?" + comment;
        if (comment[0] !== ":") comment = ":: " + comment;
        this.addComment("trailing", comment);
        this.replaceWith(t.noop());
      }
    }
  });
}
