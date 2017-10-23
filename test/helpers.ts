import * as fs from 'fs';
import * as path from 'path';

const cleanUploadedFile = function (filePath: string) {
    fs.unlink(
        path.join(__dirname, `../${filePath}`),
        error => {
            if (error) {
                throw error;
            }
        }
    );
};

export { cleanUploadedFile };
