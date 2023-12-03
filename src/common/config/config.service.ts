import { parse } from 'dotenv';
import joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  // Object that will contain the injected environment variables

  private readonly envConfig: EnvConfig;

  /**
   * Constructor recieving .env as file path
   * @param {string} filePath
   */
  constructor(filePath: string) {
    dotenv.config();
    const config = parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
   * @returns {EnvConfig} a validated environment configuration object
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    /**
     * A schema to validate envConfig against
     */
    const envVarsSchema: joi.ObjectSchema = joi.object({
      APP_ENV: joi.string().valid('dev', 'prod').default('dev'),
      BASE_URL: joi.string(),
      PORT: joi.string(),
      DB_URL: joi.string(),
      PERSONAL_PNO: joi.string(),
      TWILIO_PNO: joi.string(),
      TWILIO_SID: joi.string(),
      TWILIO_AUTH: joi.string(),
    });

    /**
     * Represents the status of validation check on the configuration file
     */
    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Fetches the key from the configuration file
   * @param {string} key
   * @returns {string} the associated value for a given key
   */
  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Checks whether the application environment set in the configuration file matches the environment parameter
   * @param {string} env
   * @returns {boolean} Whether or not the environment variable matches the application environment
   */
  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }
}
