import { Application } from 'express'
import express from 'express'
import path from 'path'
import fs from 'fs-extra'
const toml = require('@iarna/toml')
var routes_content = toml.parse(fs.readFileSync('configuration/routes.toml')),
    static_files = routes_content['StaticFiles']['Files'],
    router_files = routes_content['RouterFiles']['Files']

export function loadStaticFiles(app: Application): Application {
    for (let i of static_files) {
        app.use(i['app_path'], express.static(path.join(__dirname, '../../' + i['folder_name'])))
    }
    return app
}
export function loadRouterFiles(app:Application):Application{
    for (let i of router_files) {
        if (i['default_export'] === true || i['default_export'] === undefined) {
            app.use(i['app_path'], require(`./../../routes/${i['module_name']}`).default)
        } else {
            app.use(i['app_path'], require(`./../../routes/${i['module_name']}`))
        }
    }
    return app
}
