export default function ({ Plugin, types: t }) {
  return new Plugin("flow-comments", {
    visitor: {
      Flow(node, parent, scope, file) {
        var comment = this.getSource();
        if (parent.optional) comment = "?" + comment;
        if (comment[0] !== ":") comment = ":: " + comment;
        this.addComment("trailing", comment);
        this.replaceWith(t.noop());
      }
    }
  });
}
