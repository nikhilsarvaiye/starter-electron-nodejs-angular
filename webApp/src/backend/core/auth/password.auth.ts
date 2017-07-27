import * as crypto from 'crypto';

export class PasswordAuth {

    private static LEN = 256;
    private static SALT_LEN = 64;
    private static ITERATIONS = 10000;
    private static DIGEST = 'sha256';

    public static generateHashSalt(password: string | Buffer, callback) {
        crypto.randomBytes((PasswordAuth.SALT_LEN / 2), function (err, salt) {
            if (err) {
                return callback(err);
            }
            crypto.pbkdf2(password, salt.toString('hex'), PasswordAuth.ITERATIONS, (PasswordAuth.LEN / 2), PasswordAuth.DIGEST, function (err, derivedKey) {
                if (err) {
                    return callback(err);
                }
                callback(null, derivedKey.toString('hex'), salt.toString('hex'));
            });
        });
    }

    public static getPasswordByHashSalt(password: string | Buffer, salt: string | Buffer, callback) {

        crypto.pbkdf2(password, salt, PasswordAuth.ITERATIONS, (PasswordAuth.LEN / 2), PasswordAuth.DIGEST, (err: Error, derivedKey: Buffer) => {
            if (err) {
                return callback(err);
            }
            return callback(null, derivedKey.toString('hex'));
        });
    }
}