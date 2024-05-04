class ConfigItem {
  constructor(props) {
    this.gym = props.gym.toUpperCase();
    this.class = props.class.toUpperCase();
    this.day = props.day.toUpperCase();
    this.notBefore = props.notBefore;
    this.notAfter = props.notAfter;
  }
}

export default class ClassConfig {
  constructor(props) {
    this.classes = props.classes;
  }

  static fromJson(config) {
    return new ClassConfig({
      classes: config.map(c => new ConfigItem(c))
    })
  }

  get classNames() {
    const classNames = this.classes.map(c => c.class);
    return [...new Set(classNames)]
  }

  get gyms() {
    const gyms = this.classes.map(c => c.gym);
    return [...new Set(gyms)]
  }
}