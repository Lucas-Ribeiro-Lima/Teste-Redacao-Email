class CustomErrors extends Error {
  code
  message

  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

class InvalidFileInput extends CustomErrors {
  code
  message
  type

  constructor(code, message) {
    super()
    this.code = 400
    this.message = message
    this.type = "InvalidFileInput"
  }
}

class FileSystemError extends CustomErrors {
  code
  message
  type

  constructor(message) {
    super()
    this.code = 500
    this.message = message
    this.type = "FileSystemError"
  }
}

module.exports = { CustomErrors, InvalidFileInput, FileSystemError}