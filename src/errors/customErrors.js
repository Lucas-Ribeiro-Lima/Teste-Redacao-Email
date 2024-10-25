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
    this.code = code
    this.message = message
    this.type = "InvalidFileInput"
  }
}

class FileSystemError extends CustomErrors {
  code
  message
  type

  constructor(code, message) {
    super()
    this.code = code
    this.message = message
    this.type = "FileSystemError"
  }
}

module.exports = [InvalidFileInput, FileSystemError]