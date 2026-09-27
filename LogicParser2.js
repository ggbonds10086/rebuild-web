/**
 * 反向转换: 从逻辑树转换为逆波兰表达式
 * 用于"图转表达式"功能
 *
 * @param {Array} graphModel - 图形模型数组
 * @returns {string} - 逆波兰表达式字符串
 */
function LogicParser2(graphModel) {
    var stack = [];
    var result = [];

    for (var i = 0; i < graphModel.nodeArray.length; i++) {
        var node = graphModel.nodeArray[i];
        var type = node.type;

        if ("Import" == type) {
            stack.push({ source: i, label: node.attrs.label.text });
            continue;
        }

        if ("SEL" == type) {
            if (node.attrs.label && node.attrs.label.children && node.attrs.label.children.length === 3) {
                stack.push({ source: i, label: "SI", from: "SI" });
                stack.push({ source: i, label: "0", from: "0" });
                stack.push({ source: i, label: "1", from: "1" });
            }
        } else if ("0" == type || "1" == type) {
            stack.push({ source: i, label: node.attrs.label.text });
        }
    }

    while (stack.length > 0) {
        var top = stack.pop();
        if (stack.length > 1 && typeof top.label === "string") {
            var left = stack[stack.length - 2];
            if (top.label === "." || top.label === ",") {
                result.push(left.label + " " + top.label);
                break;
            } else if (top.label === ">") {
                result.push(left.label + " " + top.label);
                break;
            } else if (top.label === "=") {
                result.push(left.label + " " + top.label);
                break;
            }
        }
        stack.push(top);
    }

    return result.join("\n");
}