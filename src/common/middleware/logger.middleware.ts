import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const startTimestamp = new Date(startTime).toISOString();

    console.log(
      chalk.green(
        `[${startTimestamp}] Start: ${req.method} ${req.originalUrl}`,
      ),
    );
    console.log(chalk.blue(`IP: ${req.ip}`));
    console.log(chalk.magenta(`User-Agent: ${req.headers['user-agent']}`));
    console.log(chalk.cyan(`Headers: ${JSON.stringify(req.headers)}`));
    console.log(chalk.yellow(`Body: ${JSON.stringify(req.body)}`));

    res.on('finish', () => {
      const endTime = Date.now();
      const endTimestamp = new Date(endTime).toISOString();
      const duration = endTime - startTime;

      console.log(
        chalk.green(
          `[${endTimestamp}] Finished: ${res.statusCode} in ${chalk.red(duration + 'ms')}`,
        ),
      );
      console.log(
        chalk.cyan(`Response Headers: ${JSON.stringify(res.getHeaders())}`),
      );
      console.log(chalk.yellow(`Response Body: ${res.locals.body || 'N/A'}`));
    });

    const originalSend = res.send;
    res.send = function (body?: any): Response {
      res.locals.body = body;
      return originalSend.apply(this, arguments as any);
    };

    next();
  }
}
