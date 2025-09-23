import { APP_BASE_HREF } from '@angular/common';
import express, { Request, Response, NextFunction } from 'express';
import { join, resolve } from 'node:path';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const browserDistFolder = resolve(__dirname, '../browser');
  const indexHtmlPath = join(browserDistFolder, 'index.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.use(express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { protocol, originalUrl, baseUrl, headers } = req;

      // Import dynamique des modules Angular
      const { renderApplication } = await import('@angular/platform-server');
      const bootstrap = await import('./src/main.server');

      const html = await renderApplication(bootstrap.default, {
        document: indexHtmlPath,
        url: `${protocol}://${headers.host}${originalUrl}`,
        platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      });

      res.send(html);
    } catch (err) {
      next(err);
    }
  });
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
