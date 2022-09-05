import app from '@src/app';
import { port } from '@src/config/config';
import dataSource from '@src/db';

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log('server started', port);
  });
});
