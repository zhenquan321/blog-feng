import * as Joi from 'joi';
import Validation from '../validation';
import { IBlogModel } from './model';

/**
 * @export
 * @class BlogValidation
 * @extends Validation
 */
class BlogValidation extends Validation {

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
    createBlog(
        params: IBlogModel
    ): Joi.ValidationResult < IBlogModel > {
        const schema: Joi.Schema = Joi.object().keys({
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
    getBlog(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof BlogValidation
     */
    removeBlog(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new BlogValidation();
