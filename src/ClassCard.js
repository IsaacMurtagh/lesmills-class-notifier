import { parse, format } from 'date-fns';
process.env.TZ = 'UTC';

export default class ClassCard {
  constructor(props) {
    this.startsAt = props.startsAt;
    this.clubName = props.clubName;
    this.className = props.className;
    this.available = props.available;
  }

  static fromApiResponse(response) {
    const dateTimeString = `${response.startDate} ${response.startTime}`;
    const format = 'dd MMM yyyy HH:mm';
    const startDateTime = parse(
      dateTimeString,
      format, 
      new Date(),
    );
    return new ClassCard({
      startsAt: startDateTime,
      clubName: response.clubName.toUpperCase(),
      className: response.className.toUpperCase(),
      available: response.bookingIcon == 'add' ? true : false,
    })
  }

  get day() {
    return format(this.startsAt, 'eeee').toUpperCase();
  }

  get startTime() {
    return format(this.startsAt, 'HHmm');
  }

  toString() {
    const formattedDate = format(this.startsAt, 'EEEE do \'at\' h:mm aa')
    return `${this.clubName}, ${this.className} on ${formattedDate} is ${this.available ? 'available' : 'not available'}`
  }

  assertValid(classConfig) {
    for (const c of classConfig.classes) {
      if (c.gym != this.clubName) {
        continue
      }
      if (c.class != this.className) {
        continue
      }
      if (c.day != this.day) {
        continue
      }
      if (Number(this.startTime) < Number(c.notBefore)) {
        continue
      }
      if (Number(this.startTime) > Number(c.notAfter)) {
        continue
      }
      return true;
    }
    return false;
  }
}