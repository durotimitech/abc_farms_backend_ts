import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

let format;

if (process.env.NODE_ENV === "PRODUCTION") {
  format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  );
} else {
  format = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `[${info.level}]: ${info.message}`)
  );
}

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: "debug",
  // level: level(), TODO: uncomment this when you go to production
  levels,
  format,
  transports,
});

export default logger;
