interface AcademyInformation {
  academyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  chairman: string;
  residentRegistrationNumber: string;
  supportedSchools: Array<string>;
  availableTimes: Array<string>;
}

const academyInformation: AcademyInformation = {
  academyName: "임호열 영어학원",
  phoneNumber: "02-2650-8525",
  email: "kkupi@naver.com",
  address: "서울시 양천구 목동서로349 센트럴프라자 9층",
  chairman: "임호열",
  residentRegistrationNumber: "117-91-53841",
  supportedSchools: ["양천고","백암고","광영고"],
  availableTimes: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
};

export default academyInformation;
