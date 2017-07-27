// Instantiate server app
import 'ts-helpers';

import { Backend } from './backend';
import { Mongoose } from './backend/config/mongoose.config';

const backend = new Backend();
backend.listen();

Mongoose.connect();