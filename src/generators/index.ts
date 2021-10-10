import * as Generator from 'yeoman-generator'
import { createEnv } from 'yeoman-environment'

interface IAnswers {
  appName: string
}
export default class extends Generator {
  template: string = ''
  appName: string = ''
  async prompting() {
    const { template, appName } = this.options
    this.template = template
    this.appName = appName
    while (!this.appName) {
      const promptName = [
        {
          type: 'input',
          name: 'appName',
          message: 'appName'
        }
      ]
      const { appName } = await this.prompt<IAnswers>(promptName)
      this.appName = appName
    }
      if (!template) {
        const promptTemplate = [
            {
              type: 'list',
              name: 'template',
              message: 'Select a template for app',
              choices:[ { name: 'simple', value: 'simple' },]
            }
        ]
          
          const { template } = await this.prompt(promptTemplate)
          this.template = template
      }
 
    const env = createEnv()
    env.register(
      require.resolve(`./${this.template}`),
      `oclif:${this.template}`
    )

    const options = { template, appName: this.appName}
     env.run(`oclif:${this.template}`, options as any) 
  }
}
