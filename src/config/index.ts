import './dotenv'
import { Config } from './config.interface'
const env = (env: string, defaultValue: any) => {
    return ( process.env[env] ? process.env[env] : ( defaultValue ? defaultValue : undefined ) )
}

const config: Config  = {
    MONGODB_URI: env('MONGODB_URI', 'mongodb://localhost/nest'),
    FORWARDING_PHONE_NUMBER: env('FORWARDING_PHONE_NUMBER', '+923365412651')
}

export { config, Config }