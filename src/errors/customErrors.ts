export class CustomErrors extends Error {
  code: number
  message: string
  type: string

  constructor() {
    super()
  }
}

export class InvalidFileInput extends CustomErrors {
  code: number
  message: string
  type: string

  constructor(message) {
    super()
    this.code = 400
    this.message = message
    this.type = "InvalidFileInput"
  }
}

export class FileSystemError extends CustomErrors {
  code: number
  message: string
  type: string

  constructor(message) {
    super()
    this.code = 500
    this.message = message
    this.type = "FileSystemError"
  }
}

export class SMTPConfigurationError extends CustomErrors {
  code: number
  message: string
  type: string

  constructor(message) {
    super()
    this.code = 500
    this.message = message
    this.type = "SMTPConfigurationError"
  }
}

export class SMTPSendError extends CustomErrors {
  constructor(message) {
    super()
    this.code = 500
    this.message = message
    this.type = "SMTPSendError"
  }
}

export class MailInvalidError extends CustomErrors{
  constructor(message) {
    super()
    this.code = 400
    this.message = message
    this.type = "MailInvalidError"
  }
}

export class LoggerError extends CustomErrors {
  constructor(message) {
    super()
    this.code = 500
    this.message = message
    this.type = "LoggerError"
  }
}