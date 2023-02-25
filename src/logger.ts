import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  level: import.meta.env.LOGGER_LEVEL ?? "info",
});
