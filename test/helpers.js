// see https://github.com/d3/d3-ease/blob/master/test/inDelta.js and
// https://github.com/d3/d3-ease/blob/7b2f30576ad782467136aaf1688e4244f42cd2d5/test/back-test.js#L5

var tape = require("tape");

tape.Test.prototype.equal_with_perc_tolerance = function (actual, expected, perc_tol) {

    let upper = expected * (1 + perc_tol)
    let lower = expected * (1 - perc_tol)

    this._assert(lower < actual  && upper > actual, {
        message: "should be within tolerance",
        operator: "equal_with_perc_tolerance",
        actual: actual,
        expected: `between ${lower} and ${upper}`
    });
};

tape.Test.prototype.between = function (actual, expected_lower, expected_upper) {

    this._assert(expected_lower < actual && expected_upper > actual, {
        message: "should be within tolerance",
        operator: "equal_with_perc_tolerance",
        actual: actual,
        expected: `between ${expected_lower} and ${expected_upper}`
    });
};

tape.Test.prototype.floating_equalish = function (actual, expected) {
    this._assert(expected - 1e-6 < actual && actual < expected + 1e-6, {
        message: "should be in delta",
        operator: "inDelta",
        actual: actual,
        expected: expected
    });
};