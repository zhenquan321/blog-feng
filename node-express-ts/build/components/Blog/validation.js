"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class BlogValidation
 * @extends Validation
 */
class BlogValidation extends validation_1.default {
    /**
     * Creates an instance of BlogValidation.
     * @memberof BlogValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IBlogModel} params
     * @returns {Joi.ValidationResult<IBlogModel >}
     * @memberof BlogValidation
     */
    createBlog(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof BlogValidation
     */
    getBlog(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof BlogValidation
     */
    removeBlog(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
}
exports.default = new BlogValidation();
//# sourceMappingURL=validation.js.map