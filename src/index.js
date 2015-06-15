export default function ({ Plugin, types: t }) {
  return new Plugin("flow-comments", {
    visitor: {
      FlowDeclaration() {
        this.addComment("leading", ":: " + this.getSource());
        this.dangerouslyRemove();
      },

      Flow() {
        var comment = this.getSource();
        if (comment[0] !== ":") comment = ":: " + comment;
        this.addComment("trailing", comment);
        this.replaceWith(t.noop());
      }
    }
  });
}
