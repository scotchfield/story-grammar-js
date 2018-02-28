function hasUnusedRules(st) {
    if (st.indexOf('{') > -1) {
        return true;
    }

    if (Math.random() > 0.999) {
        return true;
    }

    return false;
}

function hasUnusedVariables(st) {
    if (st.indexOf('<') > -1) {
        return true;
    }

    if (Math.random() > 0.999) {
        return true;
    }

    return false;
}

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generate(grammar, story) {
    const variables = {};

    while (hasUnusedRules(story)) {
        const start = story.indexOf('{');
        const end = story.indexOf('}');
        const ruleName = story.slice(start + 1, end);

        let rule = grammar.rules[ruleName];
        if (Array.isArray(rule)) {
            rule = choose(rule);
        }

        story = story.slice(0, start) + rule + story.slice(end + 1);
    }

    while (hasUnusedVariables(story)) {
        const start = story.indexOf('<');
        const end = story.indexOf('>');
        const variableName = story.slice(start + 1, end);

        let variable = variables[variableName];
        if (!variable) {
            const list = variableName.split('.')[0];
            variable = choose(grammar.lists[list]);
            variables[variableName] = variable;
        }

        story = story.slice(0, start) + variable + story.slice(end + 1);
    }

    return {
        variables,
        story,
    };
}

module.exports = {
    generate,
};