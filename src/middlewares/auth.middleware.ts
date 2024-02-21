import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.headers;

    if (
        username !== process.env.USERNAME ||
        password !== process.env.PASSWORD
    ) {
        res.status(401).json({
            message: 'Invalid username/password',
        });
        return;
    }

    next();
};
