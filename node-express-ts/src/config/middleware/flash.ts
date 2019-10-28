export function flash() {
    const key: string = 'flash';

    return (req: any, res:any,next: any) => {
        if (req.session === undefined) throw new Error('ctx.flash requires sessions');
        const data: any = req.session[key];

        req.session[key] = null;
        Object.defineProperty(req, 'flash', {
            enumerable: true,
            get: () => data,
            set: (val: any) => {
                req.session[key] = val;
            }
        });
        next();
    };
};