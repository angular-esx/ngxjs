class BaseEnvironment {
  get assetHost() { return ''; }

  get imageHost() { return `${this.assetHost}/images`; }

  get fontHost() { return `${this.assetHost}/fonts`; }

  get isDevelopment() { return false; }

  get isProduction() { return false; }
}

export { BaseEnvironment };
