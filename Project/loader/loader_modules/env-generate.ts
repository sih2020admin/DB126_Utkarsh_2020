import fs from 'fs-extra'
import dotenv from 'dotenv'
const debug = require('debug')('service:loader:env-generate')
const toml = require('@iarna/toml')

export class ENV {
    constructor(development_folder_path: string, development_env_path: string, production_folder_path: string, production_env_path: string, toml_path: string) {
        this.production_folder_path = production_folder_path
        this.production_env_path = production_env_path
        this.development_folder_path = development_folder_path
        this.development_env_path = development_env_path
        var loader_toml= toml.parse(fs.readFileSync(toml_path))
        for (let i in loader_toml) {
            for (let j in loader_toml[i]) {
                this.env_object = this.env_object + `${j.toUpperCase()}=${loader_toml[i][j]}\n`
            }
        }
    }
    production_folder_path: string
    production_env_path: string
    development_folder_path: string
    development_env_path: string
    env_object: string = ''
    create() {
        if (fs.existsSync('env')) {
            debug('Detected env folder in current directory')
            if (fs.existsSync(this.production_folder_path) === false && fs.existsSync(this.development_folder_path) === false) {
                debug('Could not find production and development folder in env folder\nCreating them')
                this.create_both()
            }
            {
                if (fs.existsSync(this.production_folder_path)) {
                    if (fs.existsSync(this.production_env_path)) {
                        debug('.env file present in production folder')
                    } else {
                        debug('Creating .env file in production folder')
                        fs.writeFileSync(this.production_env_path, '')
                    }
                } else {
                    this.create_prod()
                }
                if (fs.existsSync(this.development_folder_path)) {
                    if (fs.existsSync(this.development_env_path)) {
                        debug('.env file present in development folder')
                    } else {
                        debug('Creating .env file in development folder')
                        fs.writeFileSync(this.development_env_path, '')
                    }
                } else {
                    this.create_dev()
                }
            }
        } else {
            debug('Creating env folder')
            fs.mkdirSync('env')
            this.create_both()
        }
    }
    create_dev() {
        debug("Couldn't find development folder in env folder")
        fs.mkdirSync(this.development_folder_path)
        debug('Creating .env file in development folder')
        fs.writeFileSync(this.development_env_path, '')
    }
    create_prod() {
        debug("Couldn't find production folder in env folder")
        fs.mkdirSync(this.production_folder_path)
        debug('Creating .env file in production folder')
        fs.writeFileSync(this.production_env_path, '')
    }
    create_both() {
        debug('Create both folder function called')
        debug('Creating production folder in env folder')
        fs.mkdirSync(this.production_folder_path)
        debug('Creating .env file in production folder')
        fs.writeFileSync(this.production_env_path, '')
        debug('Creating development folder in env folder')
        fs.mkdirSync(this.development_folder_path)
        debug('Creating .env file in development folder')
        fs.writeFileSync(this.development_env_path, '')
    }
    load(server: boolean) {
        if (server === true) {
            debug('Detected Remote Server IPV4 address')
            debug('Current system might be remote server')
            debug('Loading .env file in production folder')
            dotenv.config({ path: this.production_env_path })
        } else {
            debug("\nCouldn't detect remote server IP Address on this system")
            debug('Current system might be a local system  for testing and development')
            debug('Loading .env file in development folder')
            dotenv.config({ path: this.development_env_path })
        }
    }
    
    write(server: boolean,ipv4_address:string) {
        if (server === true) {
            fs.writeFileSync(this.production_env_path, this.env_object + `ADDRESS=${ipv4_address}`)
        } else {
            fs.writeFileSync(this.development_env_path, this.env_object + `ADDRESS=${ipv4_address}`)
        }
    }
}
