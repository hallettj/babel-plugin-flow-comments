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

  function classDeclaration(context, node) {
    return ":: declare " + classHierarchy(context, node) + " {\n  " +
      classMembers(context, node).join("\n  ") +
      "\n}";
  }

  function classHierarchy(context, node) {
    return context.getSource().slice(node.id.start - node.start, node.body.start - node.start).trim();
  }

  function classMembers(context, node) {
    return node.body.body.map(function (member) {
      if (member.type === "ClassProperty") {
        return context.getSource().slice(member.start - node.start, member.end - node.end);
      }
      else if (member.type === "MethodDefinition") {
        var func = member.value;
        return context.getSource().slice(member.start - node.start, func.body.start - node.start).trim() + ";";
      }
      else {
        return '';
      }
    });
  }

  return new Plugin("flow-comments", {
    visitor: {
      TypeCastExpression(node) {
        this.get("expression").addComment("trailing", generateComment(this.get("typeAnnotation")));
        this.replaceWith(t.parenthesizedExpression(node.expression));
      },

      // support function a(b?) {}
      Identifier(node, parent, scope, file) {
        if (parent.type === "ClassDeclaration") {
          this.addComment("trailing", ":: Class<" + node.name + ">");
        }
        else if (node.optional && !node.typeAnnotation) {
          // support function a(b?) {}
          this.addComment("trailing", ":: ?");
        }
      },

      // strip optional property from function params - facebook/fbjs#17
      Function: {
        exit(node) {
          for (var i = 0; i < node.params.length; i++) {
            var param = node.params[i];
            param.optional = false;
          }
        }
      },

      Class(node) {
        this.addComment("leading", classDeclaration(this, node));
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
