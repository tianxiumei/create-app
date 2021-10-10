import Command from '@oclif/command'
import  {createEnv} from 'yeoman-environment'

export default abstract class CommandBase extends Command {
  protected async generate(template?: string, generatorOptions: object = {}) {
    const env = createEnv();
    env.register(require.resolve(`./generators`), `oclif`) // 注册需要运行的generators

    const options = { template, ...generatorOptions }
    return env.run('oclif', options as any) 
  }
}
