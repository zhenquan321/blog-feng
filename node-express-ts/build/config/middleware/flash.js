"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flash() {
    const key = 'flash';
    return (req, res, next) => {
        if (req.session === undefined)
            throw new Error('ctx.flash requires sessions');
        const data = req.session[key];
        req.session[key] = null;
        Object.defineProperty(req, 'flash', {
            enumerable: true,
            get: () => data,
            set: (val) => {
                req.session[key] = val;
            }
        });
        next();
    };
}
exports.flash = flash;
;
//# sourceMappingURL=flash.js.map