import { Request, Response } from 'express';

export class DefaultController {
    
    async handle(req: Request, res: Response) {
        const message = 'Fullstack Challenge 2021 🏅 - Space Flight News'

        return res.status(200).json({ message })
    }
}