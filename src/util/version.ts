const VersionExpression = /^(\d)+(\.(\d+))?(\.(\d+))?(\.(\d+))?(-([\w][\w.-]*))?$/;

export default class Version {
  readonly major: number;
  readonly minor?: number;
  readonly patch?: number;
  readonly build?: number;
  readonly suffix?: string;

  constructor(major: number, minor?: number, patch?: number, build?: number, suffix?: string) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.build = build;
    this.suffix = suffix;
  }

  static parse(version: string): Version {
    const match = VersionExpression.exec(version);
    if (!match) {
      throw new Error(`Invalid version string ${version}`);
    }

    const major: number = parseInt(match[1], 10);
    const minor: number | undefined = match[3] ? parseInt(match[3], 10) : undefined;
    const patch: number | undefined = match[5] ? parseInt(match[5], 10) : undefined;
    const build: number | undefined = match[7] ? parseInt(match[7], 10) : undefined;
    const suffix = match[9];

    return new Version(major, minor, patch, build, suffix);
  }

  static compare(a: Version, b: Version): number {
    if (a.major > b.major) {
      return 1;
    } else if (a.major < b.major) {
      return -1;
    } else if ((a.minor || 0) > (b.minor || 0)) {
      return 1;
    } else if ((a.minor || 0) < (b.minor || 0)) {
      return -1;
    } else if ((a.patch || 0) > (b.patch || 0)) {
      return 1;
    } else if ((a.patch || 0) < (b.patch || 0)) {
      return -1;
    } else if ((a.build || 0) > (b.build || 0)) {
      return 1;
    } else if ((a.build || 0) < (b.build || 0)) {
      return -1;
    } else if ((a.suffix || '') > (b.suffix || '')) {
      return 1;
    } else if ((a.suffix || '') < (b.suffix || '')) {
      return -1;
    }
    return 0;
  }

  toString(): string {
    let version = `${this.major}`;

    if (this.minor !== null && this.minor !== undefined) {
      version += `.${this.minor}`;
    }

    if (this.patch !== null && this.patch !== undefined) {
      version += `.${this.patch}`;
    }

    if (this.build !== null && this.build !== undefined) {
      version += `.${this.build}`;
    }

    if (this.suffix) {
      version += `-${this.suffix}`;
    }

    return version
  }

  compare(version: Version): number {
    return Version.compare(this, version);
  }
}
