class Response {
  constructor(success, message, data, error, token = null) {
    this.success = success;
    this.message = message;
    this.data = data;
    if (token != null) this.token = token;
    this.error = error;
    if (error instanceof Error) {
      this.error = {
        message: error.message ?? '',
        name: error.name ?? '',
        stack: error.stack ?? '',
      };
    }
  }
}

module.exports = Response;
