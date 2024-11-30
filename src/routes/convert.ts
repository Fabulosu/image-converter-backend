import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ storage: multer.memoryStorage() });
export const convertRouter = express.Router();

convertRouter.post(
    '/',
    upload.single('image'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const file = req.file;
            const format = req.body.format;

            if (!file) {
                res.status(400).send('No file uploaded.');
                return;
            }

            if (!['webp', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'ico', 'avif'].includes(format)) {
                res.status(400).send('Invalid format.');
                return;
            }

            const convertedImage = await sharp(file.buffer).toFormat(format).toBuffer();

            res.set('Content-Type', `image/${format}`);
            res.send(convertedImage);
        } catch (error) {
            next(error);
        }
    }
);