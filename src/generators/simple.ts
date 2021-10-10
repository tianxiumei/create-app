import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

interface IAnswers {
  appName?: string
  appTitle: string
  appDesc: string
  appViews: string
}
export default class extends Generator {
  answers!: IAnswers
  appViews: string[] = []

  async prompting() {
    this.log(yosay(`您将创建 Pandora 平台基础应用模板`, { maxLength: 22 }))
    const prompts = [
      {
        type: 'input',
        name: 'appTitle',
        message: 'Title'
      },
      {
        type: 'input',
        name: 'appDesc',
        message: 'Description'
      }
    ]

    this.answers = await this.prompt<IAnswers>(prompts)
    this.answers.appName = this.options.appName
  }

  writing() {
    const { appName } = this.answers
    this.fs.copyTpl(
      this.templatePath('./normal/app.json.ejs'),
      this.destinationPath(`${appName}/app.json`),
      this.answers
    )
  }

  end() {
    console.log(
      `\n应用 ${this.answers.appName} 创建成功，可进入 ${this.answers.appName} 目录完善应用`
    )
  }
}
