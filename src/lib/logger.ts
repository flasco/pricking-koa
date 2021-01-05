import chalk from 'chalk';
import format from 'date-fns/format';

class Logger {
  private getTimeStamp() {
    const date = Date.now();
    const str = format(date, 'HH:mm:ss');
    return str;
  }

  info(...args: any[]) {
    console.log(chalk.blue('info'), this.getTimeStamp(), ...args);
  }

  warn(...args: any[]) {
    console.log(chalk.yellow('warn'), this.getTimeStamp(), ...args);
  }

  error(...args: any[]) {
    console.log(chalk.red('error'), this.getTimeStamp(), ...args);
  }
}

export = Logger;
