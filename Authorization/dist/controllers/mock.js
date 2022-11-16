"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock = (req, res) => {
    const id = req.params.id;
    const email = req.body.decode.email;
    const result = {
        request_num: +id,
        data: {
            username: email,
        },
    };
    return res.json(result);
};
exports.default = mock;
