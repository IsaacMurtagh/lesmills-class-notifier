import axios from 'axios';
import ClassCard from './ClassCard.js';
import { compareAsc } from 'date-fns';

const gymCodes = {
  'AUCKLAND CITY': '01'
}
const classCodes = {
  'CEREMONY': '900'
}

export async function getClasses({ gyms=[], classes=[] }) {
  const result = await axios.get(
    'https://www.lesmills.co.nz/API/TimetablePage/GetTimetableCards',
    {
      params: {
        searchClubCodes: gyms.map(g => gymCodes[g]),
        searchClassCodes: classes.map(c => classCodes[c]),
        searchTrainerNames: '',
      }
    }
  )
  return result.data.responseData.cards
    .map(ClassCard.fromApiResponse)
    .sort((c1, c2) => compareAsc(c1.startsAt, c2.startsAt));
}
