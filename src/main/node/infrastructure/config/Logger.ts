import moment from 'moment';
import chalk from 'chalk';

export class Logger {
    private context: string;

    constructor(context: string) {
        this.context = context;
    }

    private formatTimestamp(): string {
        return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

    private formatMessage(template: string, data?: Record<string, any>): string {
        if (data) {
            return template.replace(/{([^{}]*)}/g, (match, key) => {
                const value = data[key];
                if (value === undefined || value === null) {
                    return 'undefined';
                }
                return typeof value === 'object' ? JSON.stringify(value) : value;
            });
        }
        return template;
    }

    private log(level: string, messageTemplate: string, data?: Record<string, any>): void {
        const timestamp = this.formatTimestamp();
        const pid = process.pid;
        const formattedMessage = `${timestamp} ${level} ${pid} --- [${this.context.toUpperCase().padStart(20, ' ')}] : ${this.formatMessage(messageTemplate, data)}`;
        console.log(formattedMessage);
    }

    info(messageTemplate: string, data?: Record<string, any>): void {
        this.log(chalk.blue('INFO'), messageTemplate, data);
    }

    warn(messageTemplate: string, data?: Record<string, any>): void {
        this.log(chalk.yellow('WARN'), messageTemplate, data);
    }

    error(messageTemplate: string, data?: Record<string, any>): void {
        this.log(chalk.red('ERROR'), messageTemplate, data);
    }
}
