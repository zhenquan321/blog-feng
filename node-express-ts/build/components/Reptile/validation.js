"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends validation_1.default {
    /**
    * Creates an instance of AuthValidation.
    * @memberof AuthValidation
    */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params) {
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    }
}
exports.default = new AuthValidation();
//# sourceMappingURL=validation.js.map