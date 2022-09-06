import { port } from '@/config/env';
import dataSource from '@/db';
import app from './app';

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log('server started', port);
  });
});
