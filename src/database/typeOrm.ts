
import Container, { Service } from 'typedi';
import { Connection, createConnection } from 'typeorm';

import config from '../config/database.config';

export const dbCreateConnection = async (): Promise<Connection | null> => {
    try {
        const conn = await createConnection(config);
        console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);

        return conn;
    } catch (err) {
        throw err;
    }
};

