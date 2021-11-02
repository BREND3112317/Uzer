import {App} from './app';
import { DefaultException } from './exceptions/default.exception';
import { JWTException } from './exceptions/jwt.exception';

const bootstrap = () => {
    const app = new App();
    app.setException(JWTException);
    app.setException(DefaultException);
    app.bootstrap();
}

bootstrap();