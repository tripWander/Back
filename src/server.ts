import { port } from '@/config/env';
import dataSource from '@/db';
import app from './app';

await dataSource.initialize()
dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log('server started', port);
  });
});
