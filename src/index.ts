import * as fs from 'fs'
import { flags } from '@oclif/command'
import CommandBase from './base'
 
class CreateApp extends CommandBase {
  static description = 'describe the command here'
  static flags = {
    version: flags.version(),
    help: flags.help(),
    template:flags.string({ char: 't', description: 'template to use' })
  }
    
  static args = [{ name: 'appName' }]
 
    async run() {
        const { args, flags } = this.parse(CreateApp)
      if (args.appName === 'dev') {
        args.appName = ''
      }
    await super.generate(flags.template,{...args})
  }
}
 
export= CreateApp